(function(exports) {
	class SensorData {
        constructor(temperature, humidity, time){
            this.temperature = temperature;
            this.humidity = humidity;
            this.time = time;
        }

        AsArray(){
            return [this.temperature, this.humidity, this.time];
        }
    }

	exports.SensorData = SensorData;
	
})(typeof exports === 'undefined'?
	this['sensorData']={}: exports);
