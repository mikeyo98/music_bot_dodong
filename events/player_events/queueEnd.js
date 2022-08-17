const Event = require("../../structures/event.js");

module.exports = new Event("queueEnd", async (player, queue) => {
    if(queue.npmessage && queue.npmessage.editable) {
        // queue.npmessage.delete().catch(error=> {});
        const embed = queue.npmessage.embeds;
        queue.npmessage.edit({
            embeds: embed,
            components: []
        });
    }
});