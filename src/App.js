import './App.css';
import * as React from "react";
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineMarkSeries, LineSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perspective: 0,
            observers: [
                {
                    name: "Observer A",
                    x: 0,
                    relative_velocity: 0,
                    proper_time: 0
                },
                {
                    name: "Observer B",
                    x: 0,
                    relative_velocity: 0.5,
                    proper_time: 0
                },
                {
                    name: "Observer C",
                    x: 0,
                    relative_velocity: -0.5,
                    proper_time: 0
                }
        ]};
        this.set_relative_velocity = this.set_relative_velocity.bind(this);
        this.lorentzian_transform = this.lorentzian_transform.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                observers: this.state.observers.map(observer => {
                    return {
                        name: observer.name,
                        relative_velocity: observer.relative_velocity,
                        proper_time: observer.proper_time + .05/this.gamma(observer.relative_velocity)
                    }
                })
            })
        }, 50);
    }

    set_relative_velocity(idx, velocity) {
        let observers = this.state.observers;
        observers[idx].relative_velocity = velocity;
        this.setState({observers: observers});
    }

    set_perpective(idx) {
        const parsed_idx = parseInt(idx);
        const new_reference_velocity = this.state.observers[parsed_idx].relative_velocity;
        this.setState({
            perspective: parseInt(idx),
            observers: this.state.observers.map(observer => {
                return {
                    name: observer.name,
                    relative_velocity: (observer.relative_velocity - new_reference_velocity) / (1 - observer.relative_velocity*new_reference_velocity)
                }
            })
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

    render() {
        const time = this.state.observers[this.state.perspective].proper_time;
        return (
            <div>
                <form>
                    <label>Reference Frame: <select name="perspective" onChange={event => this.set_perpective(event.target.value)}>
                        {
                            this.state.observers.map((observer, idx) => (
                                <option key={idx} value={idx}>{observer.name}</option>
                            ))
                        }
                    </select></label><br/>
                    {this.state.observers.map((observer, idx) => this.state.perspective !== idx ? (
                        <label key={idx}>V<sub>{observer.name}</sub>: <input type="range" min="-.999" max=".999" step=".01" value={this.state.observers[idx].relative_velocity} onChange={event => this.set_relative_velocity(idx, event.target.value)}/><br/></label>
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
