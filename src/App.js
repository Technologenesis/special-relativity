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
                at equations?*</p>

                <p>We'll build up to special relativity gradually, starting with a few "common sense" notions.</p>

                <sup>*There will still be equations, but you won't have to read them if you don't want to.</sup>

                <h2>Space and Time</h2>

                <p>We will be using <b>spacetime diagrams</b> to visualize each step in our journey through Special
                Relativity, so before we go any farther we should figure out how to use them.</p>

                <p>A spacetime diagram is a sort of graph consisting of at least two axes: one for time, and at least one
                for space.  On it, we chart the paths of various objects through <b>space</b> over <b>time</b>.  Here's
                an example:</p>

                <SpacetimeDiagram allowPausing={false} showFrameSelector={false} showTimeDots={false} showControls={false} showLightRays={false} spaceUnits="meters" gamma={() => 1} c={Infinity} observers={[
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

                <SpacetimeDiagram paused={false} showFrameSelector={false} showControls={false} showLightRays={false} spaceUnits="meters" gamma={() => 1} c={Infinity} observers={[
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
                transcribing the physical laws of the universe, which must be solved in order.  Firstly, how do we model
                the change in reference frame?  And secondly, how do we write the laws of physics so that
                they don't change if we transform our reference frame according to that model?  The first question has a
                simple, intuitive answer: to translate a velocity from one reference frame to the next, simply subtract
                the velocity of the new frame.</p>

                <p>
                    In concrete terms, take a person, Alice, who is riding a train.  Ahead of her, through the window,
                    she sees Bob by the tracks.  He is standing still on the ground, but relative to Alice, he is moving
                    towards her at -9 meters per second. Alice throws an apple at 12 meters per second, relative to her,
                    towards Bob's head.  Assuming that all motion is happening in the same direction, to translate the
                    apple's velocity into Bob's reference frame, we subtract his velocity from the apple's.
                    Bob is therefore struck by the apple at 21 meters per second.
                </p>

                <p>Here's the same scenario in spacetime diagram form.  Try switching between perspectives to understand
                this relationship and how it appears on the diagram:</p>

                <SpacetimeDiagram showControls={false} showTimeOnAxis={true} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} gamma={()=>1} c={Infinity} observers={[
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

                <p>This method of switching between inertial reference frames is called a
                <b>Galilean transformation</b>, and they form part of the foundation of Newtonian mechanics.  However,
                by Einstein's time there were some alarming discoveries in physics that seemed to defy this very basic
                principle: the laws of physics appeared to actually <i>change</i> based on inertial reference frame.
                It appeared that for all the progress we had made in physics, something was wrong on the very
                fundamental level.  It turned out that this problem had its roots all the way down at the structure of
                space and time.
                </p>

                <h3>Galilean Transformations: A Mathematical Treatment</h3>

                <p>
                Here I will take a brief mathematical detour to describe these transformations more precisely; feel free
                to skip to the next section if you're not comfortable with some simple derivatives.
                </p>

                <p>
                    Take a reference frame, <i>S</i>, and some arbitrary coordinates in that frame <i>(x,y,z,t)</i>.
                    Say we want to translate these coordinates to a new frame, S', which is identical to S except that
                    it is moving relative to <i>S</i> with velocity <i>v</i> in the positive <i>x</i> direction.  We can
                    do that transformation as follows:
                </p>

                <p>
                x' = x-vt<br/>
                y' = y<br/>
                z' = z<br/>
                t' = t<br/>
                </p>

                <p>
                As an example, take a body which starts at position <i>p<sub>0</sub> = (x<sub>0</sub>, y<sub>0</sub>,
                z<sub>0</sub>)</i> at t=0.  It's moving at a constant velocity of <i>v<sub>body</sub></i> in the x
                direction in frame S.  Since both our frames and our body are only moving in the x direction, we will
                deal only with x and t.
                </p>
                <p>
                    We will call the body's <i>x</i> position over time x<sub>body</sub>.  The
                    constant velocity implies that x<sub>body</sub> varies linearly with t with slope v<sub>body</sub>.
                    Since x<sub>body</sub> = x<sub>0</sub> at t=0, we see that <i>x<sub>body</sub> = v<sub>body</sub>t+x<sub>0</sub></i>
                </p>
                <p>
                Say we now want to find the velocity <i>v'<sub>body</sub></i> of the body in our secondary reference frame, <i>S'</i>. As in
                <i>S</i>, we can write our position over time in frame <i>S'</i> as <i>x'<sub>body</sub></i>.
                    From our first transformation rule, we see that <i>x'<sub>body</sub>=x<sub>body</sub>-vt</i>.
                By substitution this leads to <i>x'<sub>body</sub>=v<sub>body</sub>t+x<sub>0</sub>-vt</i>.
                </p>

                <p>
                    We can rearrange this to arrive at <i>x'<sub>body</sub>=(v<sub>body</sub>-v)t+x<sub>0</sub></i>.
                    We can use our fourth transformation rule to convert our time coordinate: <i>x'<sub>body</sub>=(v<sub>body</sub>-v)t'+x<sub>0</sub></i>
                    We see that this is a linear function of t' with constant slope.  The velocity in frame S' is the
                    change in x' over the change in t', so this constant slope implies a constant velocity
                    <i>v'<sub>body</sub> = v<sub>body</sub>-v</i>
                </p>

                <SpacetimeDiagram showTimeOnAxis={true} animateAxisTime={false} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} gamma={()=>1} c={Infinity} observers={[
                    {
                        name: "Frame S",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Frame S'",
                        proper_time: 0,
                        relative_velocity: -9
                    },
                    {
                        name: "body",
                        proper_time: 0,
                        relative_velocity: 12
                    }
                ]}/>

                This may seem like a long walk for a short drink of water, but that's only because in this case, the
                result happens to correspond to our intuition.  We will use similar logic later to uncover some of the
                bizarre properties of actual spacetime.

                Note that this math doesn't really correspond to a physical law; we aren't observing how objects
                <i>behave</i>.  We're describing how they <i>appear</i> to change based on our <i>perspective</i>.  It
                therefore more closely corresponds to the structure of space itself rather than the laws that govern
                its contents.

                <h3>Alternative Transformations</h3>

                When we look at the equations representing Galilean Transformations, we might be tempted to ask why
                that <i>particular</i> transformation makes so much intuitive sense to us, and what we might find if we
                adopted a different framework.

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
            </div>
        );
    }
}

export default App;
