import * as React from 'react';
import {HorizontalGridLines, LineMarkSeries, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";

class SpacetimeDiagram extends React.Component {
    static defaultProps = {
        paused: true,
        allowPausing: true,
        animation_step: .02,
        perspective_shift_animation_length: .2,
        showLightRays: true,
        lightColor: "yellow",
        observers: [],
        showTimeDots: true,
        gamma: ((velocity,c) => 1/Math.sqrt(1-(velocity/c)**2)),
        c: 1,
        spaceUnits: "light-seconds",
        timeUnits: "seconds",
        axisTicksX: 20,
        axisTicksY: 10,
        showTimeOnAxis: true,
        animateAxisTime: false,
        showControls: true,
        showFrameSelector: true
    }

    constructor(props) {
        super(props);
        this.state = {
            proper_time: 0,
            paused: props.paused,
            observers: props.observers
        };
        this.pass_time_in_frame = this.pass_time_in_frame.bind(this);
        this.togglePaused = this.togglePaused.bind(this);
    }

    componentDidMount() {
        let lastUpdate = Date.now();
        setInterval(() => {
            const now = Date.now();
            this.pass_time_in_frame((now-lastUpdate)/1000);
            lastUpdate = now;
        })
    }

    render() {
        const frameSelector = this.props.showFrameSelector ? (
            <label>Reference Frame: <select name="perspective" onChange={event => this.set_perspective(event.target.value)}>
                {
                    this.state.observers.map((observer, idx) => (
                        <option key={idx} value={idx}>{observer.name}</option>
                    ))
                }
            </select></label>
        ) : null;
        const controls = this.props.showControls ? (
            <div>
                {
                    this.state.observers.map((observer, idx) =>
                        <label key={idx}>V<sub>{observer.name}</sub>: <input type="range" min={-this.props.maxSpeed || -this.props.c} max={this.props.maxSpeed || this.props.c} step=".01" value={this.state.observers[idx].relative_velocity} onChange={event => this.set_relative_velocity(idx, event.target.value)}/>{this.state.observers[idx].relative_velocity}<br/></label>
                    )
                }
            </div>
        ) : null;
        const pauseButton = this.props.allowPausing ? (
            <button onClick={this.togglePaused}>{this.state.paused ? "Play" : "Pause"}</button>
        ) : null;
        return (
            <div>
                {frameSelector}<br/>
                {controls}<br/>
                {pauseButton}<br/>
                <XYPlot width={500} height={500} yDomain={[this.state.proper_time, this.state.proper_time+this.props.axisTicksY]} xDomain={[-this.props.axisTicksX/2, this.props.axisTicksX/2]}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title={"Space (" + this.props.spaceUnits + ")"}/>
                    <YAxis title={"Time (" + this.props.timeUnits + ")"} tickTotal={this.props.showTimeOnAxis ? 10 : 0} position="middle"/>
                    {
                        this.state.observers.map((observer, idx) => (
                            this.props.showTimeDots ?
                                <LineMarkSeries key={idx} data={this.get_spacetime_intervals(observer)} className={observer.name}/>:
                                <LineSeries key={idx} data={this.get_spacetime_intervals(observer)} className={observer.name}/>
                        ))
                    }
                    {
                        this.props.showLightRays ? (
                            <LineSeries data={[
                                {x: -this.props.axisTicksX/2, y: this.state.proper_time + this.props.axisTicksX/(2*this.props.c)},
                                {x: 0, y: this.state.proper_time},
                                {x: this.props.axisTicksX/2, y: this.state.proper_time + this.props.axisTicksX/(2*this.props.c)}]}/>
                        ) : null
                    }
                </XYPlot>
            </div>
        );
    }

    set_perspective(idx) {
        const parsed_idx = parseInt(idx);
        const velocity = this.state.observers[parsed_idx].relative_velocity;
        const final_velocities = this.state.observers.map(observer => {
            return (observer.relative_velocity - velocity) / (1 - observer.relative_velocity*velocity/(this.props.c**2));
        });
        this.setState({
            proper_time: this.state.observers[parsed_idx].proper_time,
            observers:final_velocities.map((vel, idx) => {
                const observer = this.state.observers[idx];
                const acceleration = {
                    rate: (vel-observer.relative_velocity)/this.props.perspective_shift_animation_length,
                    final: vel
                };
                return {
                    name: observer.name,
                    relative_velocity: observer.relative_velocity,
                    proper_time: observer.proper_time,
                    acceleration: acceleration
                }
            }),
        });
    }

    get_spacetime_intervals(observer, interval=1, max=this.props.axisTicksY) {
        let data = [];
        const frame_interval = this.props.gamma(observer.relative_velocity, this.props.c); // denotes the time interval in the current reference frame between ticks
        const frame_offset = this.state.proper_time+(interval-(observer.proper_time%interval))*this.props.gamma(observer.relative_velocity, this.props.c); // denotes the time in the current reference frame until the NEXT tick
        data.push({x: 0, y: this.state.proper_time});
        let idx=0;
        let tick_time_in_current_frame = frame_offset + idx*frame_interval; // time in current frame of the idx-th tick from now
        while(tick_time_in_current_frame <= this.state.proper_time + max) { // until we hit the top of the graph,
            data.push({x: observer.relative_velocity*(tick_time_in_current_frame-this.state.proper_time), y: tick_time_in_current_frame}); // push the next tick onto the worldline
            idx += 1;
            tick_time_in_current_frame = frame_offset + idx*frame_interval; // next tick
        }
        data.push({x: observer.relative_velocity*(tick_time_in_current_frame - this.state.proper_time), y: tick_time_in_current_frame}); // one more push to make sure the line fills the whole graph
        return data;
    }

    pass_time_in_frame(delta_t) {
        this.setState({
            proper_time: this.state.paused || !this.props.animateAxisTime ? this.state.proper_time : this.state.proper_time+delta_t,
            observers: this.state.observers.map((observer) => {
                let new_vel = observer.relative_velocity;
                let new_accel = observer.acceleration;
                if(new_accel != null) {
                    const acceleration_sign = new_accel.rate < 0;
                    new_vel = observer.acceleration ? observer.relative_velocity +observer.acceleration.rate*delta_t :
                        observer.relative_velocity;
                    const diff_sign = new_accel.final - new_vel < 0;
                    if(acceleration_sign !== diff_sign) {
                        new_vel = observer.acceleration.final;
                        new_accel = null;
                    }
                }

                return {
                    proper_time: this.state.paused ? observer.proper_time : observer.proper_time + delta_t/this.props.gamma(observer.relative_velocity, this.props.c),
                    relative_velocity: new_vel,
                    acceleration: new_accel,
                    name: observer.name
                }
            })
        });
    }

    set_relative_velocity(idx, velocity) {
        this.setState({observers: this.state.observers.map((observer, this_idx) => {
            if(idx === this_idx) {
                return {
                    ...observer,
                    relative_velocity: parseFloat(velocity)
                }
            }
            return observer;
        })});
    }

    togglePaused() {
        this.setState({paused: !this.state.paused});
    }
}

export default SpacetimeDiagram;