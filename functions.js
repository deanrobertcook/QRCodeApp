function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function tidyWord(word) {
	word = toTitleCase(word);
	word = word.replace('_', ' ');
	word = word.replace("pc", 'PC');
	word = word.replace("id", 'ID');
	word = word.replace("Ram", 'RAM');
	word = word.replace("Cpu", 'CPU');
	word = word.replace("Hdd", 'HDD');
	word = word.replace("Os", 'OS');
	
	return word;
};