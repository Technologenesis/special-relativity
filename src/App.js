import './App.css';
import * as React from "react";
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineMarkSeries, LineSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

class App extends React.Component {
    static defaultProps = {
        animation_step: .02,
        perspective_shift_animation_length: .2
    }

    constructor(props) {
        super(props);
        this.state = {
            perspective: 0,
            paused: false,
            observers: [
                {
                    name: "Observer A",
                    relative_velocity: 0,
                    proper_time: 0,
                    acceleration: null
                },
                {
                    name: "Observer B",
                    relative_velocity: 0.5,
                    proper_time: 0,
                    acceleration: null
                },
                {
                    name: "Observer C",
                    relative_velocity: -0.5,
                    proper_time: 0,
                    acceleration: null
                }
        ]};
        this.set_relative_velocity = this.set_relative_velocity.bind(this);
        this.lorentzian_transform = this.lorentzian_transform.bind(this);
        this.togglePaused = this.togglePaused.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                observers: this.state.observers.map((observer) => {
                    let new_vel = observer.relative_velocity;
                    let new_accel = observer.acceleration;
                    if(new_accel != null) {
                        const acceleration_sign = new_accel.rate < 0;
                        new_vel = observer.acceleration ? observer.relative_velocity +observer.acceleration.rate*this.props.animation_step :
                            observer.relative_velocity;
                        const diff_sign = new_accel.final - new_vel < 0;
                        if(acceleration_sign !== diff_sign) {
                            new_vel = observer.acceleration.final;
                            new_accel = null;
                        }
                    }

                    return {
                        proper_time: this.state.paused ? observer.proper_time : observer.proper_time + this.props.animation_step/this.gamma(observer.relative_velocity),
                        relative_velocity: new_vel,
                        acceleration: new_accel,
                        name: observer.name
                    }
                })
            })
        }, this.props.animation_step*1000);
    }

    set_relative_velocity(idx, velocity) {
        let observers = this.state.observers;
        observers[idx].relative_velocity = parseFloat(velocity);
        this.setState({observers: observers});
    }

    set_perspective(idx) {
        const parsed_idx = parseInt(idx);
        const velocity = this.state.observers[parsed_idx].relative_velocity;
        const final_velocities = this.state.observers.map(observer => {
            return (observer.relative_velocity - velocity) / (1 - observer.relative_velocity*velocity);
        });
        this.setState({
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
            perspective: parsed_idx
        });
    }

    get_spacetime_intervals(observer, interval=1, max=10) {
        let data = [];
        const current_proper_time = this.state.observers[this.state.perspective].proper_time;
        const frame_interval = this.gamma(observer.relative_velocity); // denotes the time interval in the current reference frame between ticks
        const frame_offset = current_proper_time+(interval-(observer.proper_time%interval))*this.gamma(observer.relative_velocity);
        data.push({x: 0, y: current_proper_time});
        let idx=0;
        let tick_time_in_current_frame = frame_offset + idx*frame_interval;
        while(tick_time_in_current_frame <= current_proper_time + max) { // until we hit the top of the graph,
            data.push({x: observer.relative_velocity*(tick_time_in_current_frame-current_proper_time), y: tick_time_in_current_frame}); // push the next tick onto the worldline
            idx += 1;
            tick_time_in_current_frame = frame_offset + idx*frame_interval;
        }
        data.push({x: observer.relative_velocity*(tick_time_in_current_frame - current_proper_time), y: tick_time_in_current_frame}); // one more push to make sure the line fills the whole graph
        return data;
    }

    lorentzian_transform(velocity) {
        const gamma = 1/Math.sqrt(1-velocity**2);
        return {x_prime: (x, t) => gamma*(x-velocity*t), t_prime: (x, t) => gamma*(t-velocity*x)};
    }

    gamma(velocity) {
        return 1/Math.sqrt(1-velocity**2);
    }

    togglePaused() {
        this.setState({paused: !this.state.paused});
    }

    render() {
        const time = this.state.observers[this.state.perspective].proper_time;
        return (
            <div>
                <form>
                    <label>Reference Frame: <select name="perspective" onChange={event => this.set_perspective(event.target.value)}>
                        {
                            this.state.observers.map((observer, idx) => (
                                <option key={idx} value={idx}>{observer.name}</option>
                            ))
                        }
                    </select></label><br/>
                    {this.state.observers.map((observer, idx) => this.state.perspective !== idx ? (
                        <label key={idx}>V<sub>{observer.name}</sub>: <input type="range" min="-.999" max=".999" step=".01" value={this.state.observers[idx].relative_velocity} onChange={event => this.set_relative_velocity(idx, event.target.value)}/>{this.state.observers[idx].relative_velocity}<br/></label>
                    ) : null)}
                </form>
                <XYPlot width={500} height={500} yDomain={[time, time+10]} xDomain={[-10,10]}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title={"Space (light-seconds)"}/>
                    <YAxis title={"Time (seconds)"} position="middle"/>
                    {
                        this.state.observers.map((observer, idx) => (
                            <LineMarkSeries key={idx} data={this.get_spacetime_intervals(observer)} className={observer.name}/>
                        ))
                    }
                    <LineSeries data={[{x: 0, y: time}, {x:  10, y: time+10}]}/>
                    <LineSeries data={[{x: 0, y: time}, {x: -10, y: time+10}]}/>
                </XYPlot>

                <button onClick={this.togglePaused}>Pause</button>

                <h2>How It Works</h2>
                <p>
                    What you are looking at is a moving "Spacetime Diagram".  It shows the velocity of objects through
                    spacetime.
                </p>
                <p>
                    Use the "Reference Frame" selector to choose what speed will be considered the "zero" speed.
                    The principle of relativity dictates that your choice of reference speed should *not* affect the
                    nature of physical laws; this diagram demonstrates that.  Notice that regardless of reference frame,
                    the speed of light remains constant.
                </p>
                <p>
                    You can also adjust the relative speeds of various observers to demonstrate various relativistic
                    effects.  Each line shows the path an object would take through space-time at the given velocity.
                    The dots on each line split them into regular intervals.  They may not look regular to you - close
                    to the speed of light, the dots appear to spread out significantly.  This is due to the odd geometry
                    of spacetime - in reality, the dots are all separated by the same "spacetime interval", which each
                    observer will experience as a single second along their time axis.  The dots therefore demonstrate
                    the effects of time dilation.
                </p>
            </div>
        );
    }
}

export default App;
