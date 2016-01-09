Elm.Native.GoogleMap = {};
Elm.Native.GoogleMap.make = function(localRuntime) {
    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.GoogleMap = localRuntime.Native.GoogleMap || {};
    if (localRuntime.Native.GoogleMap.values)
    {
        return localRuntime.Native.GoogleMap.values;
    }
    if ('values' in Elm.Native.GoogleMap)
    {
        return localRuntime.Native.GoogleMap.values = Elm.Native.GoogleMap.values;
    }

    var Utils = Elm.Native.Utils.make(localRuntime);
    var Task = Elm.Native.Task.make(localRuntime);

    // mimicking https://github.com/Raynos/mercury/blob/master/docs/faq.md#how-do-i-do-custom-rendering
    function GoogleMapWidget(address, model) {
        this.address = address;
        this.model = model;
    }

    GoogleMapWidget.prototype.type = 'Widget';

    GoogleMapWidget.prototype.init = function() {
        var elem = document.createElement('div');
        elem.style.height = '80%';
        this.map = new google.maps.Map(elem, {
            center: {
                lat: this.model.lat,
                lng: this.model.lon
            },
            zoom: this.model.zoom
        });
        _this = this;
        this.map.addListener('center_changed', function() {
            var newCenter = _this.map.getCenter();
            Task.perform(_this.address._0({
                ctor: 'MoveToCoords',
                _0: Utils.Tuple2(newCenter.lat(), newCenter.lng())
            }));
        })
        this.map.addListener('zoom_changed', function() {
            Task.perform(_this.address._0({
                ctor: 'ZoomToLevel',
                _0: _this.map.getZoom()
            }));
        });
        return elem;
    }

    GoogleMapWidget.prototype.update = function(prev, elem) {
        this.map = this.map || prev.map;
        // diffing!
        var curCenter = this.map.getCenter();
        if (this.model.lat !== curCenter.lat() || this.model.lon !== curCenter.lng()) {
            this.map.setCenter({
                lat: this.model.lat,
                lng: this.model.lon
            });
        }
        if (this.model.zoom !== this.map.getZoom()) {
            this.map.setZoom(this.model.zoom);
        }
    }

    function view(address, model)
    {
        return new GoogleMapWidget(address, model);
    }


    Elm.Native.List.values = {
        view: F2(view)
    };
    return localRuntime.Native.List.values = Elm.Native.List.values;
};
