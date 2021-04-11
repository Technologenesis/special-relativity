import './App.css';
import SpacetimeDiagram from "./SpacetimeDiagram";
import * as React from "react";
import * as Latex from 'react-latex';
import '../node_modules/react-vis/dist/style.css';
import {sin, cos, atan} from 'mathjs';
import Collapsible from "react-collapsible";

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
                    in physics that have been made since its inception.  With the benefit of hindsight, then, it seems
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
                    Suppose now that I take you out to lunch as an apology.  During our meal, we notice a mysterious line
                    drawn along the ground.  After sufficient assurance on my part that this isn't some kind of trick,
                    we approach the line and investigate.
                </p>
                <p>
                    The line appears to go on forever in all directions.  We conclude that this line also has a sort of
                    symmetry: we can follow the line in either direction, as far as we want, and the line will appear
                    the same.  So we set down our things and follow the line as far as we can, for miles and miles,
                    until finally, we come upon the place where we started.

                    That we recognize this point means we must have been wrong about the symmetry this object possesses.
                    I mean, yes, clearly it <i>is</i> symmetrical in some way - it looked identical to us at every step
                    of our journey.  But you don't get back where you started just by walking along a straight line.
                    It appears that what we thought was a line was actually just a very large circle, and that the
                    symmetry we were observing wasn't the <i>translational</i> symmetry of a line, but the
                    <i>rotational</i> symmetry of a circle.  We were right about the symmetry, but we were wrong
                    about the <i>nature</i> of the symmetry - because the smallness of our perspective kept us from
                    seeing what was really happening. Keep this example in the back of your mind.  We will be returning
                    to it periodically.
                </p>
                <p>
                    Our universe, too, appears to be symmetric in many ways.  Taking the laws of physics together as a
                    "description" of the universe, there are many ways in which a person can shift their perspective
                    while that description remains valid.  For instance, I can carry out some closed experiment in
                    America, and expect to get the same results in Spain - assuming nothing about the experiment has
                    changed except the location.  So the universe, like the line, appears to exhibit
                    <i>translational</i> symmetry.
                </p>
                <p>
                    Similarly, I can carry out an experiment, then face some other direction and carry it out again,
                    and still expect the same results.  So the universe appears to  exhibit <i>rotational</i> symmetry.
                    I can wait an hour and do the experiment <i>again</i> and still expect the same result - so the
                    universe exhibits symmetry across <i>time</i>.  And finally - most relevantly for us - I can carry
                    out an experiment at some constant speed, and then carry it out at <i>another</i> constant speed,
                    and still get the same results.  The universe thus appears to exhibit symmetry across changes in
                    velocity.  In all these cases, my description of the universe <i>itself</i> - the laws of physics
                    that govern my experiment - remains identical.
                </p>
                <p>
                    However, just as when we saw the line along the ground, we might ask ourselves what limitations the
                    smallness of our perspective might be placing on our understanding of the nature of these
                    symmetries.  This is the question we will reckon with here.
                </p>
                <p>
                    We will continue to be very preoccupied with the symmetries of space and time, so I will leave the
                    subject alone for now.  In the meantime, let's fix our gaze on the objects which supposedly exhibit
                    all this symmetry: space and time themselves.
                </p>

                <Collapsible trigger={(<h3>Symmetry: A Mathematical treatment</h3>)}>
                    <p>
                        The ultimate goal of this site is to motivate relativity <i>intuitively</i>, without requiring a
                        math background and accommodating a certain level of arithmephobia.  However, I want to offer the
                        reader the opportunity to dive into the math if they so choose.  These sections aren't strictly
                        necessary to digest the argument being made, but learning the math can help ground the information
                        more solidly and thus give the reader better footing on which to reason.  The reader is thus
                        encouraged to at least try wading through the math - without worrying about moving on if it's
                        difficult to process.
                    </p>
                    <p>
                        This section isn't full of <i>equations</i>, per se, but it nonetheless contains some
                        mathematical reasoning leading up to a formal definition.  It's not strictly necessary; the
                        intuitive notion of symmetry is enough to digest what comes from here on out, but we will give it a
                        bit of a deeper treatment so that where intuition breaks down, the math will be here to ground us.
                        So with that, let's introduce the mathematical discipline concerned with symmetry: <b>group
                        theory</b>.
                    </p>
                    <p>
                        Group theory describes the ways in which a thing can be symmetrical.  Recall our informal definition
                        of symmetry: it is the property that a thing can be described the same way from multiple
                        perspectives. In these terms, then, group theory is about how these perspectives are related to each
                        other.  That probably sounds pretty abstract.  Let's go back to an example - but you're not going to
                        like where it is.
                    </p>
                    <p>
                        For instance, the triangle we had our little incident on earlier is a - hey, come back!  I'll keep
                        my hands in plain sight.  This triangle is a symmetric object, so its symmetry can can be
                        represented in group theory. We'll introduce the <b>group</b> representing the triangle's symmetries
                        by describing that symmetry ourselves.  Let's take a walk...
                    </p>
                    <p>
                        We walk around the whole triangle, counting the points as we go.  This time, to stress the sameness
                        of each perspective, we won't even bother to name the points.  The first thing we do is walk
                        clockwise to the adjacent point.
                    </p>
                    <p>
                        As before, we note that this triangle still looks exactly the same.  I mean, we <i>know</i> we
                        didn't start here, but we wouldn't be able to tell just by looking.  Therefore, we've found some
                        new perspective under which our object is completely identical.  And since it's identical, we should
                        be able to do the same thing again and get the exact same result.
                    </p>
                    <p>
                        So we continue our walk, clockwise again, to the next point, and find that we have <i>again</i>
                        found a brand new perspective from which the triangle is identical.  We then continue, clockwise
                        once more, and we do indeed find a perspective from which the triangle is identical - but this time,
                        it's one we've already seen.  It's the point we started on in the first place.
                    </p>
                    <p>
                        So we have three symmetric perspectives, all related to each other by a single action: the act of
                        walking clockwise along the triangle's sides.  From any point on the triangle, we can get to any
                        other point by repeatedly applying this action.
                    </p>
                    <p>
                        Given this, let's think about how we might talk about the different points of the triangle.  We
                        already agreed not to give them static names; after all, if we ever forget which one's which, then
                        the names are useless.  Much more relevant to us, as individuals who are only ever inhabiting one of
                        these points, is to describe the points in terms of how we can get to each one.  We can then name the
                        points as follows: the point we are standing on we will call <i>e</i>; this is a special point in
                        our naming system, since we don't need to do anything to get there.  From here we can apply
                        our action - walking clockwise - arbitrarily many times.  We will call a single application of this
                        action <i>r</i>, two applications <i>r<sup>2</sup></i>, three applications <i>r<sup>3</sup></i>,
                        and so on.  So, the point immediately clockwise to us we will call <i>r</i>, since it takes us only
                        one walk to get there; the point counterclockwise to us will be called <i>r<sup>2</sup></i>, since
                        it takes two clockwise walks to get there.  We could speak of <i>r<sup>3</sup></i>,
                        <i>r<sup>4</sup></i>, and on down the line, but there's no need: we already have a name for these,
                        since three applications of <i>r</i> gets us right back where we started.  In other words,
                        <i>r<sup>3</sup> = e</i>.
                    </p>
                    <p>
                        We have now boiled down the symmetry of the triangle to its <i>most basic</i> elements: there is
                        something we can do to it that leaves it looking identical, and if we do that thing three times, we
                        get back where we started.  These are the defining properties of <i>C<sub>3</sub></i>, a
                        mathematical object called a <i>group</i> which describes three-fold rotational symmetry - the
                        symmetry of our triangle. At last, we are ready to look at a formal definition:
                    </p>
                    <Latex displayMode={true}>$$ C_3 = \langle r | r^3 = e \rangle $$</Latex>
                    <p>
                        We can read this is follows: <i>C<sub>3</sub></i> is the group consisting of repeated applications
                        of the action <i>r</i>, such that <i>r<sup>3</sup> = e</i>.  <i>C<sub>3</sub></i> is short for the
                        <b>cyclic group</b> of order three - the <b>order</b> being the number of distinct elements in the
                        group.  The symmetry group of a rotatable square, similarly, would be <i>C<sub>4</sub></i> - the
                        cyclic group of order 4.
                    </p>
                    <p>
                        In general, a group consists, for one part, of all the <i>actions</i> that can be done to an object
                        which leave it looking identical.  It also consists of an operation known as composition, &bull;,
                        corresponding to the act of doing one action after the other.  Composing any two actions must always
                        be a valid action; after all, if the first action leaves the object unchanged, then why would the
                        second action no longer be valid?
                    </p>
                    <p>
                        Further, among its valid actions, the group must contain some <i>identity element</i>, <i>e</i>,
                        which represents taking <i>no</i> action.  Composing any action <i>a</i> with the identity action is the
                        same as just doing <i>a</i>.  Every action must also be invertible - for every action
                        <i>a</i> there must be another action <i>a<sup>-1</sup></i> that is its <i>inverse</i>, so that
                        <i>a &bull; a<sup>-1</sup> = e</i>; that is, doing one action and then its inverse is the same as
                        doing nothing.  After all, if we can walk clockwise around the triangle, can't we then walk
                        <i>counter-</i>clockwise and end up where we started?
                    </p>
                    <p>
                        The final property of these actions is a bit more subtle.  Take 3 actions, <i>a</i>, <i>b</i>
                        and <i>c</i>.  Now, surely doing a followed by b and c is the same as doing a and b, followed by c?
                        Or, formally, <i>a &bull; (b &bull; c) = (a &bull; b) &bull; c</i>.
                    </p>
                    <p>
                        With that, we have the definition of a <b>group</b>: it is a set <i>G</i> of "actions" on which is
                        defined a composition operator &bull; which has the following four properties:
                        <ul>
                            <li>
                                <b>closure</b>: the operation &bull; is <i>closed</i> over <i>G</i>.  This means that for
                                any two elements <i>a</i> and <i>b</i> of <i>G</i>, their composition
                                <i>a &bull; b</i> is also in <i>G</i>.
                            </li>
                            <li>
                                <b>identity</b>: there exists an <i>identity element</i>, e, which is the <i>do-nothing
                                action</i>.  For any element <i>a</i> in the set <i>G</i>,
                                <i>e &bull; a = a &bull; e = a</i>.
                            </li>
                            <li>
                                <b>invertibility</b>: for any element <i>a</i>, there is an <i>inverse</i> element
                                <i>a<sup>-1</sup></i> such that
                                <i>a &bull; a<sup>-1</sup> = a<sup>-1</sup> &bull; a = e</i>.
                            </li>
                            <li>
                                <b>associativity</b>: for any elements <i>a</i>, <i>b</i> and <i>c</i>,
                                <i>a &bull; (b &bull; c) = (a &bull; b) &bull; c</i>.
                            </li>
                        </ul>
                    </p>
                    <p>
                        Since the universe also has symmetry, there should be a way to describe this symmetry in
                        group theoretic terms.  Take, for example, the universe's translational symmetry: the property
                        that it's identical no matter <i>where</i> we view it from.  But this is a little different:
                        our triangle had a finite number of symmetric perspectives, while the universe appears to have
                        an infinite number.  Let's think about how to represent such a group; we will begin with the
                        translational symmetry of a simple 1-dimensional line, and expand this definition to the three
                        dimensions of the universe.
                    </p>
                    <p>
                        Recall the two parts that form a group definition: a set <i>G</i> of possible actions, and an
                        operator &bull; representing composition.  Let's start with <i>G</i>: we want a set of all possible
                        actions.  How many ways are there to slide a line along itself?
                    </p>
                    <p>
                        Well, let's say I break the line up into units.  I can slide it one meter forwards, or one meter
                        backwards.  I can also slide it two meters forwards, or two meters backwards.  Or two and a half
                        meters forward, or &pi; meters backwards.  Clearly, I can slide the line any distance I want; so
                        the set <i>G</i> consists of an action for every possible distance I could slide the line.  We can
                        represent this simply by allowing <i>G</i> to be the set of real numbers &#x211D;.
                    </p>
                    <p>
                        If we were to do more than one of these actions in a row, we would see that moving the line
                        by <i>a</i> followed by <i>b</i> leaves the line as if we had simply moved it by <i>a+b</i>.  So the
                        operator representing composition, for us, is simply the addition operator +.
                    </p>
                    <p>
                        We can now define our group in different notation than the above group: we will say it is the
                        set of real numbers paired with addition:
                    </p>
                    <Latex displayMode={true}>$$(\reals, +)$$</Latex>
                    <p>
                        We can see that this definition satisfies our group requirements.  Addition is closed over the
                        real numbers: the sum of two real numbers is always another real number.  There is an identity
                        element, 0, corresponding to not moving along the line at all.  Every element also has an inverse:
                        every real number has a <i>negative</i> with which it adds to zero, corresponding to moving the
                        line and then moving it right back to where it was, which is the same as doing nothing.  Finally,
                        addition is associative: <i>(a + b) + c = a + (b + c)</i>.
                    </p>
                    <p>
                        The 3D symmetry of the universe can be expressed similarly.  The only difference is that we can
                        translate as much as we want in <i>any direction</i>.  We can express this as a combination of
                        shifts in all three dimensions.  So rather than operating over the set of real numbers &#x211D;, we
                        are operating over all <b>tuples</b> (or ordered sets) of 3 real numbers, where each number in the
                        tuple corresponds to translation in one of our three dimensions:
                    </p>
                    <Latex displayMode={true}>$$(\reals^3, +)$$</Latex>
                    <p>
                        We will think more deeply about some of the universe's other symmetries later.  For now,
                        a brief parting word to the wise: note that the definition of a group does not
                        include <b>commutativity</b>.  Commutativity is the property that for two elements of our
                        set <i>a</i> and <i>b</i>, <i>a &bull; b = b &bull; a</i>.  This happens to have been the case for
                        every group we've defined so far, so I want to make clear that this by no means needs to be true.  A
                        group having this property is called an <i>abelian group</i>, but as far as groups alone are
                        concerned, the order of the operands can absolutely matter.
                    </p>
                </Collapsible>

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
                possible</i>, for either of them to know which of them is moving.  Hence, Galileo asserts the existence
                of a universal <i>symmetry</i> - the symmetry over velocity.
                </p>

                <p>
                    This sounds like a very simple principle, but it poses a couple of challenges for anyone tasked with
                    transcribing the physical laws of the universe, which must be solved in order.  The more obvious
                    is the <i>second</i> question: how do we write the laws in such a way that that they are
                    <b>invariant</b> over the given symmetry - meaning observers in two symmetric perspectives wouldn't
                    see a difference in the laws?  If our laws are to accurately describe the universe, they must be
                    symmetric in exactly the same way the universe is.
                </p>
                <p>
                    However, this is only relevant after a first question is answered - a much more subtle question with a
                    seemingly intuitive answer.  That question is: <i>what kind of symmetry are we dealing with?</i>
                    After all, if your laws are supposed to be invariant under some symmetry, you had better know what
                    that symmetry is.
                </p>
                <p>
                    Note, though, the situation we find ourselves in when we try to answer this question.  Just as when
                    we stood over what we thought was a straight line drawn on the ground, it could be that we are
                    not seeing some bigger picture.  But we will form a tentative model for now.
                </p>
                <p>
                    Take a person, Alice, who is riding a train.  Ahead of her, through the window,
                    she sees Bob by the tracks.  He is standing still on the ground, but relative to Alice, he is moving
                    towards her at -9 meters per second. Alice throws an apple at 12 meters per second, relative to her,
                    towards Bob's head.  Assuming that all motion is happening in the same direction, how do we know how
                    quickly the apple will hit Bob's head?  In other words, how fast is the apple moving from Bob's
                    <i>perspective</i>?
                </p>

                <p>Here's the same scenario in spacetime diagram form:</p>

                <SpacetimeDiagram showControls={false} showFrameSelector={false} showTimeOnAxis={true} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} c={Infinity} observers={[
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

                <p>
                We have no a priori way of converting this scenario to Bob's perspective.  However, we can do
                experiments to try to figure out the relationships between these perspectives.  Say
                we set up some speed detector next to Bob and carry out the experiment again to see what happens.
                </p>
                <p>
                The experiment doesn't reproduce perfectly - Bob is much angrier this time - but it works well enough
                for us, and you know that if you say anything, you could end up on the wrong side of one of these
                experiments again.  We see that from Bob's perspective, the diagram looks something like this:
                </p>

                <SpacetimeDiagram showControls={false} showFrameSelector={false} showTimeOnAxis={true} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} c={Infinity} observers={[
                    {
                        name: "Bob",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Alice",
                        proper_time: 0,
                        relative_velocity: 9
                    },
                    {
                        name: "Apple",
                        proper_time: 0,
                        relative_velocity: 21
                    }
                ]}/>

                <p>
                    The apple, then, appears to be going at its speed from Alice's perspective, <i>plus</i>
                    <i>Alice's</i> speed from <i>Bob's</i> perspective.  In other words, velocities seem to
                    <i>add</i>!  We can incorporate this into our model of spacetime: we now know that the
                    universe is symmetric under velocity addition, so we can build in the ability to add
                    velocities in order to switch between reference frames:
                </p>

                <SpacetimeDiagram showControls={false} showFrameSelector={true} showTimeOnAxis={true} showLightRays={false} maxSpeed={50} spaceUnits={"meters"} axisTicksX={80} c={Infinity} observers={[
                    {
                        name: "Alice",
                        proper_time: 0,
                        relative_velocity: 9
                    },
                    {
                        name: "Bob",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "Apple",
                        proper_time: 0,
                        relative_velocity: 21
                    }
                ]}/>

                <p>
                    This method of switching between inertial reference frames is called a
                    <b>Galilean transformation</b>, and they form part of the foundation of Newtonian mechanics.  It is
                    therefore asserted that the universe is <i>symmetric</i> under Galilean transformations.
                    However, if you look closely, you will see that our "straight-line" example was more on the nose
                    than you may have thought.  Observe how each dot simply slides to the side in a straight line when
                    your perspective changes.
                </p>
                <p>
                    This corresponds to a universal flow of time - one second in one object's perspective is the same
                    as one second in everyone else's.  This seems like an extremely natural result of the universe's
                    symmetry - why should time move faster in one perspective than the other?  After all, the universe
                    is supposed to remain symmetric no matter your velocity.  And indeed, this was treated as a natural,
                    fundamental property of the universe for a long time.  But we should beware that the smallness
                    of our perspective doesn't lead us to accept unsure conclusions as forgone...
                </p>
                <p>
                    By Einstein's time there were some alarming discoveries in physics that seemed to threaten the very
                    symmetry of the universe itself: the laws of physics appeared to actually <i>change</i> based on inertial reference frame.
                    It appeared that for all the progress we had made in physics, something was wrong on the very
                    fundamental level.  If we wanted a universe that was symmetric over changes in velocity, we were
                    going to need a paradigm shift - as it turned out, one that revolutionized our understanding of
                    the structure of space and time.
                </p>

                <Collapsible trigger={(<h3>Galilean Transformations: A Mathematical Treatment</h3>)}>
                    <p>
                        Here I will take a brief mathematical detour to describe these transformations more precisely; feel free
                        to skip to the next section if you're not comfortable with some simple math.  However, if you <i>are</i>
                        comfortable with simple math, I encourage you to read this section.  The symbols may be intimidating,
                        but the math itself is no more complicated than linear functions in pre-algebra.
                    </p>
                    <p>
                        If you read the spiel about group theory, you know that all this talk about symmetry has to have
                        an underlying mathematical formalism.  We have this thing called a <b>Galilean
                        transformation</b> that we can supposedly do to our universe and leave it looking the same, as
                        far as the laws of physics are concerned.  So let's start by talking about what those
                        transformations are.
                    </p>
                    <p>
                        At their core, Galilean transformations are meant to describe how to convert between two
                        coordinate systems (or <b>reference frames</b> which are moving relative to each other.  That
                        motion is the only difference between the two frames; they start off with their clocks
                        synchronized and in the exact same place, but one coordinate system is moving at a constant
                        speed relative to the other, causing them to drift apart over time.
                    </p>
                    <p>
                        Take an some reference frame, <i>S</i>, and some arbitrary coordinates in that frame
                        <i>(x,y,z,t)</i>. Say we want to translate these coordinates to a new frame, <i>S'</i>, which is
                        identical to S except that
                        it is moving relative to <i>S</i> with velocity <i>v</i> in the positive <i>x</i> direction.  A
                        <b>Galilean transform</b> is a function of those coordinates<i>f(x,y,z,t)
                        =(x',y',z',t')</i> where:
                    </p>
                    <Latex displayMode={true}>{
                        "$\\begin{matrix}" +
                            "x' = x-vt\\\\" +
                            "y' = y\\\\" +
                            "z' = z\\\\" +
                            "t' = t\\\\" +
                        "\\end{matrix}$"
                    }</Latex>
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
                        So now we see what the purpose of a Galilean transform is, mathematically: they describe the
                        act of moving from one perspective to the other.  You might guess, then, that these Galilean
                        transforms are the elements of our group set <i>G</i>; and you would be correct.  Each transform
                        represents a way in which you can switch inertial reference frame, under which the universe
                        remains identical.  Just plug in the relative velocity of the frame you're switching into for
                        <i>v</i> in the Galilean transform, solve the equations, and you're golden.
                    </p>
                    <p>
                        Our composition operator &bull; will just be the act of applying one transform after another.
                        Take two transforms, <i>A</i> and <i>B</i> such that (simplifying to one spatial dimension):
                    </p>
                    <Latex displayMode={true}>{"$\\begin{matrix}" +
                    "A(x, t) = (x-v_At, t)\\\\" +
                    "B(x, t) = (x-v_Bt, t)" +
                    "\\end{matrix}$ then we can apply both functions in secession to see the composition:" +
                    "$(A \\cdot B)(x, t) = (x-[v_A+v_B]t, t)$"}</Latex>
                    <p>
                        In linear algebra parlance, each of these transforms can be represented as a matrix, and from
                        that perspective our composition operator is simply matrix multiplication:
                    </p>
                    <Latex displayMode={true}>{
                        "$A \\cdot B = \\begin{bmatrix}" +
                        "1 & -v_A\\\\" +
                        "0 & 1" +
                        "\\end{bmatrix}" +
                        "\\begin{bmatrix}" +
                        "1 & -v_B\\\\" +
                        "0 & 1" +
                        "\\end{bmatrix}" +
                        " = " +
                        "\\begin{bmatrix}" +
                        "1 & -(v_A+v_B)\\\\" +
                        "0 & 1" +
                        "\\end{bmatrix}$"
                    }</Latex>
                </Collapsible>


                <h3>Spacetime Intervals: an Early Introduction</h3>
                <p>
                When we think about these Galilean Transformations, we might be tempted to ask why
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
                time - always adhere perfectly to the straight horizontal lines running across our time axis.
                This makes intuitive sense - it preserves a universal flow of time.  But if we think of our diagram in
                terms of the stuff in the middle - <b>spacetime</b> - and think of the distance the dots are travelling
                through it, we notice a strange property.  For fast bodies, the "dots" appear to move very quickly
                along the line - that is, they appear to <i>speed up</i> through spacetime.
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
                    Let's think about this from the perspective of symmetry.  If the universe is supposed to be symmetric
                    under this transformation, surely we can't be inflating some distances and compressing others?
                    Surely both observers should agree on the distance they're travelling through spacetime?
                </p>
                <p>
                    Because of this, we must accept that the difference in distance is not <i>real</i>; the perceived
                    difference arises only from our <i>perspective</i>.  In reality, therefore, distance through
                    <i>spacetime</i> must not actually depend on distance through <i>space</i> at all!  This probably
                    seems like a bit of a weird property, and in fact it is.  But it didn't seem all that weird before
                    folks started thinking of space and time as intertwined, so we're kind of cheating.
                </p>
                <p>
                We will call this notion of distance through spacetime the <b>spacetime interval</b>.  The spacetime interval between two
                points in spacetime will be the amount of time a body travelling between them would experience
                during its journey.  So the fact that all the dots line up with the time axis - that
                distance through spacetime depends only on distance through time - ensures that all moving bodies
                experience time at the same rate, regardless of their speed.
                </p>
                <SpacetimeDiagram paused={false} showControls={true} showLightRays={false} maxSpeed={10} spaceUnits="meters" c={Infinity} observers={[
                    {
                        name: "A",
                        proper_time: 0,
                        relative_velocity: 0
                    },
                    {
                        name: "B",
                        proper_time: 0,
                        relative_velocity: 1.5
                    },
                    {
                        name: "C",
                        proper_time: 0,
                        relative_velocity: 3
                    },
                    {
                        name: "D",
                        proper_time: 0,
                        relative_velocity: -2
                    }
                ]}/>
                <p>
                    As a little thought experiment, let's think about what would happen if this <i>weren't</i> the case.
                    What if, for example, distance through <i>spacetime</i> worked the same way as distance through
                    regular <i>space</i>?
                </p>
                <p>
                    In regular space, moving 3 meters forward puts you exactly 3 meters from where you started; but moving
                    3 meters left <i>and</i> 3 meters forward puts you farther away than that; something like
                    4.25 meters from where you started.  Let's say you're hooked up to a three meter chain.  You could -
                    okay, fine.  Bob!  Get over here.
                </p>
                <p>
                    Let's say Bob is hooked up to a three meter chain.  He could walk
                    three meters forward <i>or</i> three meters left; but not both.  He's constrained by a three
                    meter circle which simply won't let him go that far.
                </p>
                <p>
                    By contrast, in the spacetime we've been describing, distance depends only on time; so a person can
                    go as far as they want along their space axis with no tradeoff to the distance they travel through
                    time.  But what if they did?  What if they made the same tradeoff Bob makes?  We would expect to see
                    that as their time dots get further away in space, they would get closer to the origin; the same way
                    that the farther Bob moves to the left, the less he can move forward.
                </p>
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
                    constant?  Take a minute and try to think about why this might be.  We have seen a problem like this
                    before.
                </p>
                <p>
                    Got it yet?  It's okay if not.  Generations of scientists took centuries to solve this problem.  I
                    only gave you a paragraph break.  But you did get the benefit of some priming: recall the line we
                    saw on the ground.  Now, at last, that metaphor pays off.  The dots on the line <i>appear</i> to
                    be moving in a straight line, but this only <i>appears</i> to be the case because our perspective
                    is so small.  We are looking at a diagram plotting meters against seconds, but we have no idea how
                    much a single meter along our spatial axis will offset our speed through time.  As it turns out, in
                    real life, a meter is actually an extremely small unit of measurement compared to a second, which is
                    why our dots' positions in time don't appear to change based on changes in distance.  But are they
                    <i>really</i> moving in straight lines?  Or, just as when we tried following the line on the ground,
                    is this just an appearance arising from our limited perspective?
                </p>
                <p>
                    To answer this question, let's zoom out.
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
                <p>
                    Now <i>there's</i> something interesting!  We've broadened our perspective significantly; the x axis
                    is now measured in light-seconds, which is about 3x10<sup>8</sup> meters.  Fiddle around with the
                    velocities a bit.  You'll find that increasing the velocity of an object <i>rotates</i> its time
                    axis rather than <i>sheering</i> it.  The dot moves not along a straight line, but around the origin
                    - in a circle!  Velocity here represents not the straight-line distance between the objects at each
                    time, but the arc-length between the objects - i.e. the distance <i>along</i> the
                    circle around which they are rotating.
                </p>

                <p>
                    Already we are uncovering some effects that have analogues in the theory of relativity.  For
                    instance, because the dots are no longer evenly spaced along our reference frame's time axis,
                    it appears to pass at different rates for different objects.  In our case, the dots appear closer
                    together and thus <i>contracted</i>; their real-life counterparts appear <i>dilated</i> for very
                    similar reasons.
                </p>
                <p>
                    Notice that if you crank the velocity, the line disappears below the x axis and pops up
                    on the other side!  This is the <i>flip-side</i> of the line; it represents the object's past. By doing
                    this, we have reversed the object's orientation along our time axis.  In other words, the object is
                    travelling backwards in time!
                </p>
                <p>
                    This is a neat little property, but don't get too excited.  We've called an axis on our graph
                    "time", but what's <b>time-like</b> about it, really?  It doesn't flow in a uniform direction.
                    It's not related to the spatial dimensions in a special way: in fact, it's explicitly defined
                    so that it fits in exactly with the other spatial dimensions.  An object in this universe could
                    double back on itself and intersect with its own past - clearly a nonsensical property.  But this
                    is nonetheless a good thought experiment with which to introduce <b>spacetime</b> and <b>spacetime
                    intervals</b>.  We will see shortly that real spacetime has its own exotic properties which,
                    luckily for us, nonetheless preserve the causal structure of time.
                </p>
                <Collapsible trigger={(<h3>Spacetime Intervals: A Mathematical treatment</h3>)}>
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
                </Collapsible>
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
