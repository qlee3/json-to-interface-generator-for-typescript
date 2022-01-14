const capitalize = (str) => {
  const result = str[0].toUpperCase() + str.slice(1, str.length);
  return result;
};

const makeInterfaceByJson = (interfaceName, input, prefix = '') => {
  const name = prefix + capitalize(interfaceName);
  let result = `export interface ${name} {\n`;
  const subInterface = [];

  for (const key in input) {
    let item = `  ${key}: `;
    if (typeof input[key] === 'string') {
      item += 'string;\n';
    } else if (typeof input[key] === 'number') {
      item += 'number;\n';
    } else if (typeof input[key] === 'boolean') {
      item += 'boolean;\n';
    } else if (Array.isArray(input[key])) {
      if (input[key].length === 0) {
        item += '[];\n';
      } else if (typeof input[key][0] === 'string') {
        item += 'string[];\n';
      } else if (typeof input[key][0] === 'number') {
        item += 'number[];\n';
      } else if (typeof input[key][0] === 'boolean') {
        item += 'boolean[];\n';
      } else {
        item += `${capitalize(interfaceName)}${capitalize(key)}[];\n`;
        subInterface.push(
          makeInterfaceByJson(key, input[key][0], capitalize(interfaceName)),
        );
      }
    } else if (typeof input[key] === 'object') {
      item += `${capitalize(interfaceName)}${capitalize(key)};\n`;
      subInterface.push(
        makeInterfaceByJson(key, input[key], capitalize(interfaceName)),
      );
    }
    result += item;
  }

  subInterface.forEach((v) => {
    result = v + result;
  });

  return `${result}};\n\n`;
};

const inquirer = require('inquirer')

var questions = [
  {
    type: 'editor',
    name: 'data',
    message: "paste your json"
  },
  {
    type: 'input',
    name: 'name',
    message: "What's interface name?"
  }
]

inquirer.prompt(questions).then(answers => {

  try {

    const name = answers['name'];
    const data = answers['data'];
    console.log('-------------')
    console.log(makeInterfaceByJson(name, JSON.parse(data)))
    console.log('-------------')
    console.log('drag and copy')
  } catch (error) {
    console.log(error)
  }
  
})

console.log();
