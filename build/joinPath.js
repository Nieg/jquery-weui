module.exports = function () {
    var args = Array.prototype.slice.call(arguments),
        len = args.length,
        result = [];
    while (len--) {
        var arg = args[len].replace(/(?:^\/+)|(?:\/+$)/ig, '');
        if (!arg.length) continue;
        result.unshift(arg + '/');
        if (arg.indexOf('./') === 0) {
            break;
        }
    }
    return result.join('');
};
