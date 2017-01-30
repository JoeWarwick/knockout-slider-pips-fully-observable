# knockout-slider-pips-fully-observable
A bindinghandler for jquery slider + jquery slider pips. This binds to an observable / array of observables / observable array of observables / observable array of non observables as the case may require.

Data-Bind attributes { pipSlider: <value> | [array / observable array], sliderOptions: {<jquery slider options>}, pipOptions: {<tick and pip options>}, floatOptions: {<label and float options>}  }

For the jquery options see:
http://api.jqueryui.com/slider
For the pip options see
http://simeydotme.github.io/jQuery-ui-Slider-Pips/#options-pips
For float options see
http://simeydotme.github.io/jQuery-ui-Slider-Pips/#options-float

Example usage:
```html
<div id="pipSlider" class="pips" style="width:100%;" data-bind="pipSlider: segments, sliderOptions: { step: 0.05, max: 30, create: segmentsCreate, slide: segmentSlide }, pipOptions:{ step: 2, first: 'pip', last: 'pip', formatLabel: function(v){ return '$'+v.toFixed(0); } }, floatOptions: { formatLabel: function(v){ return '$'+v.toFixed(2); } }"></div>
```
- Using an observable array means that any changes to the observable array structure will be immediately visible on the slider.
- Using observable values inside an array means that sliding a handle will effectively be bound to each observable and will       notify to your app on each change.
- Using both means that the number of handles is two way databound and also each individual handle is two way databound.

If it is desired to stop the slider handles from being able to pass over each other then the following function can be passed into the slider options.slide parameter.
```code
    function (e, ui) {
        var idx = ui.values.indexOf(ui.value);
        if (idx == 0 || ui.value <= ui.values[idx - 1] || (idx !== ui.values.length - 1 && ui.value >= ui.values[idx + 1]))
            e.stopImmediatePropagation();
    };
```
