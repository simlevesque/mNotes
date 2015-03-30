(function(exports){
    exports.freqs = [16.35,17.32,18.35,19.45,20.6,21.83,23.12,24.5,25.96,27.5,29.14,30.87,32.7,34.65,36.71,38.89,41.2,43.65,46.25,49,51.91,55,58.27,61.74,65.41,69.3,73.42,77.78,82.41,87.31,92.5,98,103.83,110,116.54,123.47,130.81,138.59,146.83,155.56,164.81,174.61,185,196,207.65,220,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.3,440,466.16,493.88,523.25,554.37,587.33,622.25,659.25,698.46,739.99,783.99,830.61,880,932.33,987.77,1046.5,1108.73,1174.66,1244.51,1318.51,1396.91,1479.98,1567.98,1661.22,1760,1864.66,1975.53,2093,2217.46,2349.32,2489.02,2637.02,2793.83,2959.96,3135.96,3322.44,3520,3729.31,3951.07,4186.01,4434.92,4698.63,4978.03,5274.04,5587.65,5919.91,6271.93,6644.88,7040,7458.62,7902.13];
    exports.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    exports.flats = {'A': 1, 'B': 1, 'C': 0, 'D': 1, 'E': 1, 'F': 0, 'G': 1};
    exports.sharps = {'A': 1, 'B': 0, 'C': 1, 'D': 1, 'E': 0, 'F': 1, 'G': 1};
    exports.octaves = 9;
    exports.db = {};
    exports.init = function(){
        var c = 0, z = this, l = z.notes.length;
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
        var l = arguments.length, n, o, t, z = this, ia, ib;
        if(Object.keys(this.db).length === 0) z.init();
        if(l === 1 && (a.length === 2 || a.length === 3)){
            var d = a.split('');
            if(a.length === 2) return z.get(d[0], d[1]);
            else if(a.length === 3) return z.get(d[0], d[1], d[2]);
        } else if(l === 3 || l === 2){
            if(l === 2) t = 'n';
            else {
                if(c === 'n' || c === 's' || c === 'f') t = c;
                else if(c === '#') t = 's';
                else if(c === 'b') t = 'f';
                else t = c.charAt(0).toLowerCase();
            }
            if(t !== 'n' && t !== 's' && t !== 'f') console.error('Wrong type : please use Normal, Sharp or Flat');
            ia = isNaN(parseInt(a));
            ib = isNaN(parseInt(b));
            if(ia && !ib){
                n = a;
                o = b;
            } else if (!ia && ib){
                n = b;
                o = a;
            }
            else console.error('The first and second argument should be one number and one letter, any order');
            if(o < 0 || o > z.octaves-1) console.error('The octave argument must be between 0 and ' + (z.octaves - 1));
            n = n.toUpperCase();
            return z.db[o][n][t];
        } else console.error('No argument');
    };
})(typeof exports === 'undefined'? this['mNotes']={}: exports);