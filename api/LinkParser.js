const parseLink = (str) => {
	str = str.toLowerCase();
	let matched = str.match(/href\s*=\s*\".*\"/g)[0].match(/\".*\"/g)[0];
	return matched.replace(/"/g, "");;
}

module.exports = parseLink;