import './App.css';
import SpacetimeDiagram from "./SpacetimeDiagram";
import * as React from "react";
import * as Latex from 'react-latex';
import '../node_modules/react-vis/dist/style.css';
import {sin, cos, atan} from 'mathjs';

class App extends React.Component {
    render() {
        return (
            <div>
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

                <h2>Prologue: Symmetry</h2>

                <p>
                    One of the most fundamental properties our universe has is that it is a highly symmetrical object.
                    This symmetry lies at the heart of the theory of relativity, as well as many of the developments
                    in physics that have been made sense its inception.  With the benefit of hindsight, then, it seems
                    that our approach to relativity should emphasize this fundamental symmetry, and that we should
                    motivate our investigation in those terms.
                </p>
                <p>
                    You're probably most familiar with symmetry in the realm of shapes, so we'll start there.  Take the
                    example of an equilateral triangle.  We imagine that we are standing at one of its points; for
                    brevity, we will call the point we are standing on <i>A</i>.  The point clockwise to us is <i>B</i>,
                    and the point counter-clockwise to us is <i>C</i>.
                </p>
                <p>
                    Now, suppose that as you are contemplating the situation, I club you in the head, knocking you
                    unconscious.  You wake up some time later and see that you are still on <i>some</i> point of the
                    triangle. Ignoring the effects of any potential concussion, can you identify, just from looking at the
                    triangle, which point you're standing on?
                </p>
                <p>
                    Assuming an ideal equilateral triangle, the answer is clearly no.  All the points look identical
                    from the perspective of a person standing on any one of them - they would all describe the triangle
                    the exact same way.
                </p>
                <p>
                    This reveals the property that we call <b>symmetry</b>: informally, we will say it is the property
                    that an object is identical from multiple perspectives.
                </p>
                <p>
                    Suppse now that I take you out to lunch as an apology.  During our meal, we notice a mysterious line
                    drawn along the ground.  After sufficient assurance on my part that this isn't some kind of trick,
                    we approach the line and investigate.
                </p>
                <p>
                    The line appears to go on forever in all directions.  We conclude that this line also has a sort of
                    symmetry: we can follow the line in a straight line in whichever direction the line points, as far
                    as we want, and the line will appear the same.  So we set down our things and follow the line as far
                    as we can, for miles and miles, until finally, we come upon the place where we started.  That we
                    recognize this point means we must have been wrong about the symmetry this object possesses.  While
                    it's true that every point along our journey has been identical, we know that we are seeing a
                    <i>different kind</i> of symmetry.  It appears that what we thought was a line was actually just
                    a very large circle, and that the symmetry we were observing wasn't the <i>translational</i>
                    symmetry of a line, but the <i>rotational</i> symmetry of a circle.  But the limits of our
                    perspective stopped us from seeing this fact.
                </p>
                <p>
                    Our universe, too, appears to be symmetric in many ways.  Taking the laws of physics together as a
                    "description" of the universe, there are many ways in which a person can shift their perspective
                    while that description remains valid.  For instance, I can carry out some experiment in America,
                    and expect to get the same results in Spain - assuming nothing about the experiment has changed
                    except the location.  So the universe, like the line, appears to exhibit
                    <i>translational</i> symmetry.  Similarly, I can carry out an experiment, then face some other
                    direction and carry it out again, and still expect the same results.  So the universe appears to
                    exhibit <i>rotational</i> symmetry. I can wait an hour and do the experiment <i>again</i> and still
                    expect the same result - so the universe exhibits symmetry across <i>time</i>.  And finally - most
                    relevantly for us - I can carry out an experiment at some constant speed, and then carry it out at
                    <i>another</i> constant speed, and still get the same results.  The universe thus appears to exhibit
                    symmetry across changes in velocity.  In all these cases, my description of the universe
                    <i>itself</i> remains identical, although I might have different thoughts about what other objects
                    <i>in</i> the universe are doing relative to <i>me</i>.
                </p>
                <p>
                    We will continue to be very preoccupied with the symmetries of space and time, so I will leave the
                    subject alone for now.  In the meantime, let's fix our gaze on the objects which supposedly exhibit
                    all this symmetry: space and time themselves.
                </p>

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

                <SpacetimeDiagram paused={false} showFrameSelector={false} showControls={false} showLightRays={false} spaceUnits="meters" c={Infinity} observers={[
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

                <SpacetimeDiagram showControls={false} showTimeOnAxis={true} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} c={Infinity} observers={[
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
                to skip to the next section if you're not comfortable with some simple math.  However, if you <i>are</i>
                comfortable with simple math, I encourage you to read this section.  The symbols may be intimidating,
                but the math itself is no more complicated than linear functions in pre-algebra.
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
                    We can ignore the middle two equations for now since they leave <i>y</i> and <i>z</i> unchanged.
                    Linear Algebra fans will recognize this as a <b>sheer transformation</b> representable by matrix
                    multiplication:
                </p>

                <Latex displayMode={true}>{
                    '$\\begin{bmatrix}' +
                    'x\'\\\\' +
                    't\'\\\\' +
                    '\\end{bmatrix}' +
                    ' = ' +
                    '\\begin{bmatrix}' +
                        '1 & -v \\\\' +
                        '0 & 1' +
                    '\\end{bmatrix}' +
                    '\\begin{bmatrix}' +
                        'x\\\\' +
                        't\\\\' +
                    '\\end{bmatrix}$'
                }</Latex>

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

                <SpacetimeDiagram showTimeOnAxis={true} animateAxisTime={false} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} c={Infinity} observers={[
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

                <p>
                This may seem like a long walk for a short drink of water, but that's only because in this case, the
                result happens to correspond to our intuition.  We will use similar logic later to uncover some of the
                bizarre properties of actual spacetime.
                </p>
                <p>
                Note that this math doesn't really correspond to a physical law; we aren't observing how objects
                <i>behave</i>.  We're describing how they <i>appear</i> to change based on our <i>perspective</i>.  It
                therefore more closely corresponds to the structure of space itself rather than the laws that govern
                its contents.
                </p>

                <h3>Spacetime Intervals: an Early Introduction</h3>
                <p>
                When we look at the equations representing Galilean Transformations, we might be tempted to ask why
                that <i>particular</i> transformation makes so much intuitive sense to us, and what we might find if we
                adopted a different framework.
                </p>
                <p>
                    There is one critical feature of the Galilean model that makes it a natural choice: it holds the
                    flow of time constant for all bodies, regardless of their velocity through space.  It's worth noting
                    that this by no means needs to be the case.
                </p>
                <p>
                    Recall that our spacetime diagram portrays an object's motion through space over time - or,
                    considered together, <b>spacetime</b>.  In our model, all objects flow through time at the same
                    rate.  This is actually kind of an interesting property.  Our velocity through all spatial
                    dimensions can be changed, but we have one, immutable velocity through time.
                </p>

                <SpacetimeDiagram showFrameSelector={false} showLightRays={false} maxSpeed={10} spaceUnits="meters" c={Infinity} observers={[
                    {
                        name: "Moving Body",
                        proper_time: 0,
                        relative_velocity: 0
                    }
                ]}/>

                <p>
                Notice that no matter how you adjust the object's relative speed, the dots on its line - its flow of
                time - are equally spread along our graph's time axis.  Further, they always move at the same rate
                with respect to the time axis.  This makes intuitive sense - it preserves a universal flow of time.  But
                if we think of our diagram in terms of the stuff in the middle - <b>spacetime</b> - and think of
                the distance the dots are travelling through it, we notice a strange property.  For very fast bodies,
                the "dots" appear to move very quickly along the line - that is, they appear to <i>speed up</i> through
                spacetime.
                </p>
                <p>
                And yet, when we switch into that object's frame of reference, its dots are spread out only by the
                length of one second along the time axis, while it is the dots along our initial axis that are spread
                out.
                </p>

                <SpacetimeDiagram paused={false} showControls={false} showLightRays={false} maxSpeed={10} spaceUnits="meters" c={Infinity} observers={[
                    {
                        name: "Initial Reference Frame",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Fast Body",
                        proper_time: 0,
                        relative_velocity: 10
                    }
                ]}/>

                <p>
                Despite the apparent difference in distance between dots, each body thus appears to experience their
                movement in the exact same way.  The difference in distance thus does not appear to be <i>real</i>;
                the perceived difference arises only from our <i>perspective</i>. To reflect this, we can develop a
                notion of <i>distance</i> in our spacetime that is <b>invariant</b> to our perspective - i.e. it is
                defined in such a way that all dots, for all observers, are separated by the same distance.

                We will call this notion of distance the <b>spacetime interval</b>.  The spacetime interval between two
                points in spacetime will be the amount of time a body travelling between them would experience
                during its journey.

                Since the dots line up along the time axis no matter what, their distance can be given very simply:
                where <i>&Delta;s</i> represents the distance between two points in <b>spacetime</b> and <i>&Delta;t</i>
                represents their distance along the time axis, <i>&Delta;s = &Delta;t</i>.  How bizarre!  Distances in <i>spacetime</i> appear to be totally
                independent of distance in <i>space</i>!
                </p>
                <p>
                As a little thought experiment, let's think about what would happen if this <i>weren't</i> the case.
                What if distance through <i>spacetime</i> worked the same way as distance through <i>space</i> - which,
                as you may recall, is expressed by the <b>Pythagorean theorem</b>:
                </p>

                <Latex displayMode={true}>{'$\\Delta s = \\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$'}</Latex>

                <p>
                    To describe distance through space<i>time</i>, we could easily slip time into this equation:
                </p>

                <Latex displayMode={true}>{'$\\Delta s = \\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2+c^2\\Delta t^2}$'}</Latex>
                <Latex>
                    Where $$c$$ is an arbitrary constant for converting between units of time and units of space.  The
                    fact that it shares a name with the speed of light is no accident, but we will get there later.
                </Latex>
                <p>
                    Let's try plotting this on a spacetime diagram.  It will look a lot like our other ones, only the
                    dots along each line will no longer be redundant: they will reflect <i>distance</i> through
                    spacetime along the lines, which the moving body will experience as a second.
                </p>

                <SpacetimeDiagram id="pythagorean_spacetime" c={3e8} maxSpeed={5} spaceUnits={"meters"} axisTicksX={10} showLightRays={false} transform={(velocity, c) => {
                    let theta = velocity*atan(1/c);
                    return [
                        [cos(theta)/c, -sin(theta)],
                        [sin(theta),  cos(theta)]
                    ]
                }} translateVelocity={(v_frame, v_body, _) => v_body-v_frame} observers={[
                    {
                        name: "Observer A",
                        relative_velocity: 0,
                        proper_time: 0
                    },
                    {
                        name: "Observer B",
                        relative_velocity: 2,
                        proper_time: 0
                    },
                    {
                        name: "Observer C",
                        relative_velocity: -2,
                        proper_time: 0
                    }
                ]}/>

                <p>
                    Voila!  We have now decoupled ourselves from Galilean transformations, and are free to explore
                    any spacetime we please!  Like this one!  This exotic spacetime geometry works by... well...
                    actually, it doesn't seem to work all that differently, does it?  Why are our dots still so evenly
                    spaced out along the time axis?  Shouldn't it be the length along the <i>line</i> which is
                    constant?  Take a minute and try to think about why this might be.  If you need a place to start,
                    try to work out the distances between some pairs of dots using our distance equation.
                </p>
                <p>
                    Have you tried it yet?  If you tried working out the distance between two points,
                    you may have noticed that you're missing a very important part of the equation: <i>c</i>, the
                    conversion factor between meters and seconds!  I left this parameter at its real-world value, which
                    is ~3x10<sup>8</sup> meters per second.  As a result, <i>c<sup>2</sup>&Delta;t<sup>2</sup></i>
                    absolutely dominates the distance equation; <i>&Delta;x<sup>2</sup></i> is negligible in comparison.
                    This incongruence gives rise to what appears to be a Galilean relationship between velocities.
                    However, we can use <i>light-seconds</i> for the units on our x axis.  A light-second is the
                    distance light travels in a single second.  Since we are using the speed of light as our conversion
                    factor <i>c</i>, by definition, measuring our distance in light-seconds gives us a conversion factor
                    <i>c</i> of 1 light-second per second:
                </p>

                <SpacetimeDiagram allowPausing={false} id="pythagorean_spacetime" maxSpeed={3.14} step={.001} axisTicksX={10} showLightRays={false} transform={(theta, c) => {
                    return [
                        [cos(theta)/c, -sin(theta)],
                        [sin(theta),  cos(theta)]
                    ]
                }} translateVelocity={(v_frame, v_body, _) => v_body-v_frame} observers={[
                    {
                        name: "Observer A",
                        relative_velocity: 0,
                        proper_time: 0
                    },
                    {
                        name: "Observer B",
                        relative_velocity: .3,
                        proper_time: 0
                    },
                    {
                        name: "Observer C",
                        relative_velocity: -.3,
                        proper_time: 0
                    }
                ]}/>

                <p>Now <i>there's</i> something interesting!  Fiddle around with the velocities a bit.  You'll find
                that increasing the velocity of an object <i>rotates</i> its time axis rather than <i>sheering</i> it.
                Velocity here represents not the straight-line distance between the objects at each time, but arc-length
                between the objects over time as measured in the reference frame - i.e. the distance <i>along</i> the
                circle around which they are rotating.</p>

                <SpacetimeDiagram id="pythagorean_spacetime" maxSpeed={3.14} step={.001} axisTicksX={10} showLightRays={false} transform={(theta, c) => {
                    return [
                        [cos(theta)/c, -sin(theta)],
                        [sin(theta),  cos(theta)]
                    ]
                }} translateVelocity={(v_frame, v_body, _) => v_body-v_frame} observers={[
                    {
                        name: "Observer A",
                        relative_velocity: 0,
                        proper_time: 0
                    },
                    {
                        name: "Observer B",
                        relative_velocity: .3,
                        proper_time: 0
                    },
                    {
                        name: "Observer C",
                        relative_velocity: -.3,
                        proper_time: 0
                    }
                ]}/>

                <p>This is also representable as a system of equations (which, as promised, you are free to skip - just
                calling it a "rotation" is enough):</p>

                <Latex displayMode={true}>
                    {"$\\begin{matrix}" +
                        "x' = cos(\\theta)x/c - sin(\\theta)t\\\\" +
                        "t' = sin(\\theta)x + cos(\\theta)t" +
                    "\\end{matrix}" +
                    "\\:or\\:" +
                    "\\begin{bmatrix}" +
                        "cos(\\theta)/c & -sin(\\theta)\\\\" +
                        "sin(\\theta) & cos(\\theta)" +
                    "\\end{bmatrix}$"}
                </Latex>

                <p>
                    Already we are uncovering some effects that have analogues in the theory of relativity.  For
                    instance, because the dots are no longer evenly spaced along our reference frame's time axis,
                    it appears to pass at different rates for different objects.  In our case, the dots appear closer
                    together and thus <i>contracted</i>; their real-life counterparts appear <i>dilated</i> for very
                    similar reasons.
                </p>

                <p>Notice that if you crank the velocity, the line disappears below the x axis and pops up
                on the other side!  This is the <i>flip-side</i> of the line; it represents the object's past. By doing
                this, we have reversed the object's orientation along our time axis.  In other words, the object is
                travelling backwards in time!</p>

                <p>
                    This is a neat little property, but don't get too excited.  We've called an axis on our graph
                    "time", but what's <b>time-like</b> about it, really?  It doesn't flow in a uniform direction.
                    It's not related to the spatial dimensions in a special way: in fact, it's explicitly defined
                    so that it fits in exactly with the other spatial dimensions.  An object in this universe could
                    double back on itself and intersect with its own past - clearly a nonsensical property.  But this
                    is nonetheless a good thought experiment with which to introduce <b>spacetime</b> and <b>spacetime
                    intervals</b>.  We will see shortly that our own spacetime has its own exotic properties which,
                    luckily for us, nonetheless preserve the causal structure of time.
                </p>

                <h2>A Rip in the Fabric</h2>

                <p>
                    Spoiler - neither the Galilean model nor our custom "Pythagorean" model correspond to real
                    spacetime.  But scientists in the 19th century didn't know that, and they also didn't have animated
                    diagrams of alternate spacetime structures.  So they can be forgiven for not having that on their
                    radar when they started seeing some quite anomalous things.
                </p>
                <p>
                    Several experiments had begun to show that certain things appeared to change about the world based
                    on a person's velocity.  The most well-known of these was that light appeared to have a constant
                    speed - this speed did <i>not</i> appear to vary with the speed of the emitting body.  It was
                    proposed by some that this could be the result of some invisible, all-permeating substance called
                    the <b>luminiferous aether</b> - but if this were the case, we would at least expect to measure some
                    variation in our measurement of the speed of light, based on the relative velocity of the measurement
                    apparatus to the aether itself.  No such variation could be recorded.  The speed of light did not
                    obey the Galilean transformations.
                </p>
                <p>
                    This was a very bad sign; Galileo's principle of relativity holds that the laws of physics should be
                    <i>invariant</i> under changes in inertial frame.  This appeared not to be the case.  No satisfactory
                    explanation could be given until Einstein published his paper on special relativity, which was not
                    based on any experiments.  It started only with two assumptions, and deduced the entire theory
                    from these: that the laws of physics are invariant under changes in inertial reference frame,
                    <i>and</i> the speed of light in a vacuum is constant for all observers.
                </p>
                <p>
                    
                </p>

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
