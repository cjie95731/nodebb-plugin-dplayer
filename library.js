'use strict';

const videoRegex = /<p dir="auto">!\((.*)\)<\/p>/g;

const VideoExtendedMarkdown = {
	// post
	parsePost(data, callback) {
		if (data && data.postData && data.postData.content) {
			data.postData.content = applyExtendedMarkdown(data.postData.content);
		}
		callback(null, data);
	},
	parseRaw(data, callback) {
		if (data) {
			data = applyExtendedMarkdown(data);
		}
		callback(null, data);
	},
	registerFormating(payload, callback) {
		const formating = [
			{name: "video", className: "fa fa-video-camera", title: "[[videoextendedmarkdown:composer.formatting.video]]"},
		];

		payload.options = payload.options.concat(formating);

		callback(null, payload);
	}
}

function applyExtendedMarkdown(textContent) {
	if (textContent.match(videoRegex)) {
		textContent = textContent.replace(videoRegex, function (match, text) {
			return `<div class="dplayer-block">${text}</div>`;
		});
	}
	return textContent;
}

module.exports = VideoExtendedMarkdown;
