import * as React from 'react';
import {HorizontalGridLines, LineMarkSeries, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";
import {matrix, multiply, add, inv, abs, subset, index} from 'mathjs';

class SpacetimeDiagram extends React.Component {
    static defaultProps = {
        paused: true,
        allowPausing: true,
        animation_step: .02,
        perspective_shift_animation_length: .2,
        showLightRays: true,
        maxSpeed: .999,
        debug: false,
        lightColor: "yellow",
        observers: [],
        showTimeDots: true,
        transform: (velocity, c) => {
            const gamma = 1/Math.sqrt(1-(velocity/c)**2);
            return [
                [gamma, -velocity*gamma],
                [-velocity*gamma/c**2, gamma]
            ];
        },
        c: 1,
        translateVelocity: (v_frame, v_body, transform) => {
            const dx_body = v_body;
            const dt_body = 1;
            const dxprime_body = transform[0][0]*dx_body + transform[0][1]*dt_body;
            const dtprime_body = transform[1][0]*dx_body + transform[1][1]*dt_body;
            return dxprime_body/dtprime_body;
        },
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
                        <label key={idx}>V<sub>{observer.name}</sub>: <input type="range" min={-this.props.maxSpeed || -this.props.c} max={this.props.maxSpeed || this.props.c} step={this.props.step || .001} value={this.state.observers[idx].relative_velocity} onChange={event => this.set_relative_velocity(idx, event.target.value)}/>{this.state.observers[idx].relative_velocity + " " + (this.props.velocityUnits || (this.props.spaceUnits + "/" + this.props.timeUnits))}<br/></label>
                    )
                }
            </div>
        ) : null;
        const pauseButton = this.props.allowPausing ? (
            <button onClick={this.togglePaused}>{this.state.paused ? "Play" : "Pause"}</button>
        ) : null;
        return (
            <div style={{margin: "0 auto", width: 500, backgroundColor: "#f0ffff", borderRadius: 10, padding: 10}}>
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
                <p>{this.props.debug ? JSON.stringify(this.state.observers) : null}</p>
            </div>
        );
    }

    set_perspective(idx) {
        const parsed_idx = parseInt(idx);
        const velocity = this.state.observers[parsed_idx].relative_velocity;
        const final_velocities = this.state.observers.map(observer => {
            return this.props.translateVelocity(velocity, observer.relative_velocity, this.props.transform(velocity, this.props.c));
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
        // sticking a lot of consts in here since it's the only way to break up the math a little

        // we grab a matrix for transforming from our current frame into the observer frame
        const transform_to_observer_frame = matrix(this.props.transform(observer.relative_velocity, this.props.c));
        // and one for jumping back again
        const transform_from_observer_frame = inv(transform_to_observer_frame);

        // the interval is given in terms of seconds in the observer reference frame,
        // which corresponds to a vector in the observer's frame along the time axis
        const interval_in_observer_frame = matrix([0, interval]);
        // so we convert this into an interval in our reference frame
        const unoriented_interval_in_reference_frame = multiply(transform_from_observer_frame, interval_in_observer_frame);
        // we must also ensure that the time component of our interval is positive
        const time_directionality_aligned = subset(unoriented_interval_in_reference_frame, index(1)) >= 0;
        const interval_in_reference_frame = multiply(time_directionality_aligned ? 1 : -1, unoriented_interval_in_reference_frame);

        // we also need a starting point in our current frame.
        // This is a little complicated, since if the object is going forwards in time, this is its NEXT
        // tick, while if it's going backwards in time, this will be its LAST tick.
        const offset_of_next_interval_tick_in_observer_frame = matrix([0, -(observer.proper_time % interval) + (time_directionality_aligned ? interval : 0)]);
        // now we convert that point into our current reference frame to get a spacetime offset for the first point we'll draw
        const offset_of_next_interval_tick_in_reference_frame = multiply(transform_from_observer_frame, offset_of_next_interval_tick_in_observer_frame);

        // we only want to draw within the bounds of the graph (plus some extra to ensure we fill the whole thing),
        // so we denote these bounds here:
        const diagram_bounds = [
            [-this.props.axisTicksX / 2 - abs(subset(interval_in_reference_frame, index(0))), -subset(interval_in_reference_frame, index(1))], // minimum
            [this.props.axisTicksX / 2 + abs(subset(interval_in_reference_frame, index(0))), this.props.axisTicksY + subset(interval_in_reference_frame, index(1))] // maximum
        ];

        // create a handy way to check if we should keep drawing the line
        const is_in_bounds = (point) => {
            return !(subset(point, index(0)) < diagram_bounds[0][0] ||
                subset(point, index(1)) < diagram_bounds[0][1] ||
                subset(point, index(0)) > diagram_bounds[1][0] ||
                subset(point, index(1)) > diagram_bounds[1][1]);
        };

        // long walk for a short drink of water:
        let data = [];
        data.push({x:0, y:this.state.proper_time});
        for(let offset = offset_of_next_interval_tick_in_reference_frame; is_in_bounds(offset); offset = add(offset, interval_in_reference_frame)) {
            data.push({x: subset(offset, index(0)), y: subset(offset, index(1))+this.state.proper_time});
        }
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
                    proper_time: this.state.paused ? observer.proper_time : observer.proper_time + abs(delta_t/
                        this.props.transform(new_vel, this.props.c)[1][1]),
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