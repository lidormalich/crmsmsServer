const SMS = require('../models/smsmodel');
module.exports.updateSMS = function (eventId, phoneNumber) {
    SMS.findOne({ eventId: eventId })
        .then((data) => {
            let pepoleSMS = data.smsSendTo;
            pepoleSMS.push({ phoneNumber, status: "send" })
            SMS.findOneAndUpdate({ eventId: eventId }, { smsSendTo: pepoleSMS }, { returnDocument: 'after' }, function (err, doc) {
                // res.json(200); //IS OK
                return (pepoleSMS);
            })

            // console.log(found);
        })
        .catch(err => { console.log(err); return (err) })
}


