import './App.css';
import SpacetimeDiagram from "./SpacetimeDiagram";
import * as React from "react";
import '../node_modules/react-vis/dist/style.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Special Relativity Visualizer</h1>

                <SpacetimeDiagram observers={[
                    {
                        name: "Observer A",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Observer B",
                        proper_time: 0,
                        relative_velocity: .5
                    },
                    {
                        name: "Observer C",
                        proper_time: 0,
                        relative_velocity: -.5
                    }
                ]}/>

                <p>Relativity gets a bit of a bad rap for being "difficult".  That's not to say it's exactly "easy", and
                certainly not that it's intuitive.  It holds some extremely deep
                insights into the nature of the world that challenge our everyday experience.  Einstein's name has
                become synonymous with "genius" in part because he was able to come up with the theory from scratch.
                But it was that part - "from scratch" - that earned him his fame.  Luckily for us, the trail is already
                blazed.  If we want to get an intuition for relativity, we need only retrace the steps.</p>

                <p>The goal of this site is to make the foundations of relativity - in particular, <b>special relativity
                </b> and the inherent structure of <b>spacetime</b> - accessible through visualization.  After all, the
                core insights of relativity are supposedly geometric in nature.  So why try to understand it by staring
                at equations?</p>

                <p>We'll build up to special relativity gradually, starting with a few "common sense" notions.</p>

                <h2>Space and Time</h2>

                <p>We will be using <b>spacetime diagrams</b> to visualize each step in our journey through Special
                Relativity, so before we go any farther we should figure out how to use them.</p>

                <p>A spacetime diagram is a sort of graph consisting of at least two axes: one for time, and at least one
                for space.  On it, we chart the paths of various objects through <b>space</b> over <b>time</b>.  Here's
                an example:</p>

                <SpacetimeDiagram allowPausing={false} showFrameSelector={false} showTimeDots={false} showControls={false} showLightRays={false} spaceUnits="meters" c={3e8} observers={[
                    {
                        name: "Observer A",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Observer B",
                        proper_time: 0,
                        relative_velocity: 5
                    },
                    {
                        name: "Observer C",
                        proper_time: 0,
                        relative_velocity: -1
                    }
                ]}/>

                <p>The above diagram shows three objects: one is stationary, one is moving to the right at 5 meters
                per second, and the third is moving to the left at 1 meter per second.</p>

                <p>This diagram is still very compatible with common-sense.  We have an axis for time which is totally
                separate from our axis in space.  An object "moves" when its position in space changes based on its
                position in time.  Furthermore, all objects experience time at the same "rate" - that is, a second is a
                second is a second, no matter what velocity you're going.  To visualize this, look at the dots as they
                move across the lines.  One dot represents the passing of one second for each object:</p>

                <SpacetimeDiagram paused={false} showFrameSelector={false} showControls={false} showLightRays={false} spaceUnits="meters" c={3e8} observers={[
                    {
                        name: "Observer A",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Observer B",
                        proper_time: 0,
                        relative_velocity: 5
                    },
                    {
                        name: "Observer C",
                        proper_time: 0,
                        relative_velocity: -1
                    }
                ]}/>

                <p>Note that, although these objects are moving through space over time, their lines on the graph always
                start at x=0 even as time passes.  In reality, these objects would be moving along the x axis at their
                given velocity, but we will (usually) ignore this fact for the purpose of keeping all our objects neatly
                within view, since it is not usually the positions we care about, but the velocities.</p>

                <p>This simple diagram already puts us in a position to think about some of the things we'll be dealing
                with as we explore relativity.  For instance, plotting space and time together calls into
                question: just what is the stuff in the middle?  What is it that objects are "traversing" as time
                passes?  And if we consider it as just one object, are distances in space and distances in time
                unrelated?  These are the questions we will answer when we begin to discuss the geometry underlying the
                universe itself - <b>spacetime</b>.</p>

                <p>But let's not get too ahead of ourselves.  Now that we know what we'll be looking at, let's dive in
                and see what the relativity scene looks like pre-Einstein.</p>

                <h2>Galilean Relativity</h2>

                <p>Although the word "relativity" is closely associated with Einstein's work, the concept predates him
                by centuries.  Before Einstein, the word was most closely related to <b>Galileo's principle of
                relativity</b>, which states that the laws of physics should apply equally regardless of <b>inertial
                reference frame</b>. In other words, a person cruising along in a spaceship moving at a constant speed
                follows the same physical laws as a stationary person.  Indeed, it should not be necessary, <i>nor even
                possible</i>, for either of them to know which of them is moving.
                </p>

                <p>This sounds like a very simple principle, but it poses a couple of challenges for anyone tasked with
                transcribing the physical laws of the universe.  For one, how do we write the laws of physics so that
                they don't change if we transform our reference frame into a new one?  And for another, <i>how do we model
                the change in reference frame</i> - that is, what actually happens when we change velocity?  In case the
                italics didn't give it away, we'll be concerned with the second question here.</p>

                <p>For a very long time, we thought we had a model that accurately described what happens when we change
                velocity - basically just a formalization of the intuitive idea that velocities <i>add together</i> when we
                change reference frames.  In concrete terms, Alice is riding a train moving at 9 meters per second
                relative to Bob.  Alice throws an apple at 12 meters per second, relative to her, in the direction of the
                train.  Bob therefore sees the apple moving at 21 meters per second.

                Here's the same scenario in spacetime diagram form.  Try switching between perspectives to understand
                this relationship and how it appears on the diagram:</p>

                <SpacetimeDiagram paused={false} showControls={true} showLightRays={false} spaceUnits={"meters"} axisTicksX={80} c={3e8} observers={[
                    {
                        name: "Alice",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Bob",
                        proper_time: 0,
                        relative_velocity: -9
                    },
                    {
                        name: "Apple",
                        proper_time: 0,
                        relative_velocity: 12
                    }
                ]}/>

                <h2>A Rip in the Fabric</h2>

                <SpacetimeDiagram paused={false} showLightRays={false} maxSpeed={10} spaceUnits="meters" c={3e8} observers={[
                    {
                        name: "Observer A",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Observer B",
                        proper_time: 0,
                        relative_velocity: 5
                    },
                    {
                        name: "Observer C",
                        proper_time: 0,
                        relative_velocity: -1
                    }
                ]}/>

                <h2>How It Works</h2>
                <p>
                    What you are looking at is a moving "Spacetime Diagram".  It shows the velocity of objects through
                    spacetime.
                </p>
                <p>
                    You mi
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
