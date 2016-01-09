# Elm Google Maps Experiment

This is an experiment to figure out how complex widgets which maintain their own state can be used nicely from the Elm Architecture. If we can find a way, maybe the Native Module format can be changed to reduce the amount of boilerplate necessary for people to do things like this, while guiding them away from doing things that break Elm's functional semantics.

The Virtual DOM hooking at the core of this is based on [this example](https://github.com/Raynos/mercury/blob/master/docs/faq.md#how-do-i-do-custom-rendering).

