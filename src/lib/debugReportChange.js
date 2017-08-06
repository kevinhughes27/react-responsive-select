export default function debugReportChange( name, action, nextState ) {

  if (
    process.env.NODE_ENV === 'development'
    && typeof window !== 'undefined'
    && window.location.search.indexOf('debug=true') > -1
  ) {

    const removeCircular = (obj) => {
      let cache = [];
      const result = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1 || (key === 'markup')) return; // Circular reference found, discard key
          cache.push(value);
        }
        return value;
      }, 2);
      cache = null;
      return result;
    };

    console.log(
      '\nname:', '"' + name + '\'',
      '\naction:', JSON.parse(removeCircular(action)),
      '\nnextState:', JSON.parse(removeCircular(nextState))
    );
  }
}
