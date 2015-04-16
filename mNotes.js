(function(exports){
	exports.freqs = [16.35,17.32,18.35,19.45,20.6,21.83,23.12,24.5,25.96,27.5,29.14,30.87,32.7,34.65,36.71,38.89,41.2,43.65,46.25,49,51.91,55,58.27,61.74,65.41,69.3,73.42,77.78,82.41,87.31,92.5,98,103.83,110,116.54,123.47,130.81,138.59,146.83,155.56,164.81,174.61,185,196,207.65,220,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.3,440,466.16,493.88,523.25,554.37,587.33,622.25,659.25,698.46,739.99,783.99,830.61,880,932.33,987.77,1046.5,1108.73,1174.66,1244.51,1318.51,1396.91,1479.98,1567.98,1661.22,1760,1864.66,1975.53,2093,2217.46,2349.32,2489.02,2637.02,2793.83,2959.96,3135.96,3322.44,3520,3729.31,3951.07,4186.01,4434.92,4698.63,4978.03,5274.04,5587.65,5919.91,6271.93,6644.88,7040,7458.62,7902.13];
	exports.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
	exports.flats = {'A': 1, 'B': 1, 'C': 0, 'D': 1, 'E': 1, 'F': 0, 'G': 1};
	exports.sharps = {'A': 1, 'B': 0, 'C': 1, 'D': 1, 'E': 0, 'F': 1, 'G': 1};
	exports.octaves = 9;
	exports.db = 0;
	exports.init = function(){
		var c = 0, z = this, l = z.notes.length;
		z.db = {};
		for(var i = 0; i < z.octaves; i++){
			z.db[i] = {};
			for(var j = 0; j < l; j++){
				var n = z.notes[j], f = z.freqs[c];
				z.db[i][n] = {'n':0, 'f':0, 's':0};
				if(z.flats[n]){
					z.db[i][n].f = f;
 					f = z.freqs[++c];
				}
				z.db[i][n].n = f;
				f = z.freqs[++c];
				if(z.sharps[n]) z.db[i][n].s = f;
			}
		}
	};
	exports.get = function(a,b,c){
		var z = this, d, e, f, g;
		if(z.db === 0) z.init();
		if(arguments.length === 0) console.error('No arguments');
		else if(arguments.length !== 1) req = Array.prototype.slice.call(arguments).toString();
		else req = a;
		f = req.match(/[nsfNSFb#]+/);
		f = !!f ? f[0].toLowerCase() : 'n';
		if(f=='b') f = 'f';
		else if(f=='f') req = req.replace(/f/, '');
		else if(f=='#') f = 's';
		e = req.match(/[a-gA-G]+/);
		e = !!e ? e[0].toUpperCase() : 0;
		d = req.match(/\d+/);
		d = !!d ? d[0] : 0;        
		if(!d || !e) console.error('Syntax error');
		if(e < 0 || e > z.octaves-1) console.error('The octave argument must be between 0 and ' + (z.octaves - 1));
		g = z.db[d][e][f];
		if(!g) console.error('Note does not exist');
		return g;
	};
})(typeof exports === 'undefined'? this['mNotes']={}: exports);
