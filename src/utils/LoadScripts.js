/* FUNCION PARA EL LOADER */
export default function LoadScript(src) {

    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
        document.body.removeChild(script);
    })
}