ko.bindingHandlers.pipSlider = (function () {
    var setValues = function (array, store) {
        $.each(array, function (i, o) {
            if (ko.isObservable(store.values)) {
                if (ko.isObservable(store.values()[i])) {
                    if (store.values()[i]() !== o) store.values()[i](o);
                } else store.values()[i] = o;
            } else {
                if (ko.isObservable(store.values[i])) {
                    if (store.values[i]() !== o) store.values[i](o);
                } else store.values[i] = o;
            }
        });
        return array;
    },
        slide = function (e, ui) {
            if (ko.isObservable(this.values)) {
                setValues(ui.values, this);
                this.values.notifySubscribers();
            } else {
                if (this.values) {
                    this.values = setValues(ui.values, this);
                } else if (ko.isObservable(this.value)) {
                    this.value(ui.values ? setValues(ui.values, this) : ui.value);
                } else {
                    this.value = ui.values ? setValues(ui.values, this) : ui.value;
                }
            }
        };
    return {
        init: function (element, valueAccessor, allBindingsAccessor) {
            options = allBindingsAccessor().sliderOptions || {};
            var pipOptions = allBindingsAccessor().pipOptions || {};
            var floatOptions = allBindingsAccessor().floatOptions || {};
            var observable = valueAccessor();
            var defaults = {};
            var pipDefaults = { rest: "label" };
            var store = $(element).data('store') || {};
            if (observable.splice) {
                store.values = observable;
                defaults.values = $.map(ko.unwrap(observable), function (v) { return ko.unwrap(v); });
                if (ko.isObservable(observable))
                    observable.subscribe(function () {
                        options.values = $.map(observable(), function (v) { return ko.unwrap(v); });
                        var diff = ko.utils.arrayFilter(ko.utils.compareArrays($(element).slider('values'), options.values), function (d) { return d.status != 'retained'; });
                        if (diff.length) {
                            $(element).slider("pips", "destroy");
                            $(element).slider("destroy");
                        }
                    });
            } else {
                store.value = observable;
                defaults.value = ko.unwrap(observable);
            }
            defaults.change = slide.bind(store);
            options = $.extend(defaults, options);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).slider("pips", "destroy");
                $(element).slider("destroy");
            });
            $(element).data('store', store);
            $(element).slider(options).slider('pips', $.extend(pipDefaults, pipOptions)).slider('float', floatOptions);
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().sliderOptions || {};
            var pipOptions = allBindingsAccessor().pipOptions || {};
            var floatOptions = allBindingsAccessor().floatOptions || {};
            var observable = valueAccessor();
            var defaults = {};
            var pipDefaults = { rest: "label" };
            var store = $(element).data('store') || {};
            if (observable.splice) {
                store.values = observable;
                defaults.values = $.map(ko.unwrap(observable), function (v) { return ko.unwrap(v); });
            } else {
                store.value = observable;
                defaults.value = ko.unwrap(observable);
            }
            defaults.change = slide.bind(store);
            options = $.extend(defaults, options);
            $(element).data('store', store);
            $(element).slider(options).slider('pips', $.extend(pipDefaults, pipOptions)).slider('float', floatOptions);
        }
    };
})();
