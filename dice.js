const { VK } = require('vk-io');
const vk = new VK({ token: 'token', pollingGroupId: 190667296 }), cmds = [];
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont("./fonts/VKSansDisplay-Bold.ttf", { family: "VKSansDisplay-Bold" });
registerFont("./fonts/VKSansDisplay-DemiBold.ttf", { family: "VKSansDisplay-DemiBold" });

vk.updates.on('message_new', async (context) => {
	const input = context.text
	const input2 = input.replace(/\[club\d+\|@arzmirageoff\]/g, '');
	context.text = input2.trimStart()

	let cmd = cmds.find(x => x[0].test(context.text));
	if (!cmd) return;
	context.$match = context.text.match(cmd[0]);
	await cmd[1](context);
});

vk.updates.startPolling().catch(console.error);

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
function cmd(one, two) {
	cmds.push([one, two]);
}

cmd(/^(?:\/dice)$/i, async (context) => {
	const [info] = await vk.api.users.get({ user_id: context.senderId })
   // context.reply({ message: `🎲 Пользователь [id${context.senderId}|${info.first_name} ${info.last_name}] подкинул кубик...`, disable_mentions: 1 })
	
    let int = getRandomInt(1, 100)

	/*const canvas = createCanvas(1920, 968);
	const ctx = canvas.getContext('2d');
	const background = await loadImage('Untitled.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.70)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ffffff';
	ctx.font = '48px VKSansDisplay-DemiBold';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(`Пользователю <<${info.first_name} ${info.last_name}>> выпало число: ${int}`, canvas.width / 2, canvas.height / 2);
	ctx.font = '12px VKSansDisplay-Bold';
	ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
	ctx.fillText(`vk.com/arzmirageoff`, canvas.width / 2, canvas.height - 50);
	const imageBuffer = canvas.toBuffer();

	const uploadResponse = await vk.upload.messagePhoto({
		source: {
			value: imageBuffer,
			filename: 'image.png'
		}
	});*/
	
	await context.reply({ disable_mentions: 1, message: `🎲 Пользователю [id${context.senderId}|${info.first_name} ${info.last_name}] выпало число: [id${context.senderId}|${int}]`/*, attachment: `photo${uploadResponse.ownerId}_${uploadResponse.id}`*/ });
    return;
});