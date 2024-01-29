const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
    assistantId: {
        type: String,
        required: true,
        unique: true
    },
    assistantName: {
        type: String,
        required: true
    },
    assistantPhone: {
        type: String,
        required: true
    },
    assistantAssistance: {
        type: Boolean,
        default: false
    }
});

const Assistant = mongoose.models.assistant || mongoose.model("assistant", assistantSchema);

module.exports = Assistant;