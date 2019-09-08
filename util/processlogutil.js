function mailMasker(body) {
    let bodyClone = JSON.parse(JSON.stringify(body));
    bodyClone.password = '***';
    return bodyClone;
}

module.exports.mailMasker = mailMasker;