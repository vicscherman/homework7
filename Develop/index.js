// node dependencies. 
const inquirer = require ('inquirer');
const fs = require ('fs');
const path = require('path');

// array of questions for user
function promptUser() {
    //returns a promise
 return inquirer.prompt([
            {
            name: "project_title",
            type: "input",
            message: "What is your project called?",
        } ,
        {
            name:"project_description",
            type: "input",
            message: "Write a brief description of the project."
        },
        {
            name:"installation_instructions",
            type: "input",
            message: "How do you install your project?",
        },
        {
            name: "usage_instructions",
            type: "input",
            message: "Please tell me how to use the product.",
        },
        {
            name: "project_credits",
            type: "input" ,
            message: "Please list collaborators for the project and their contributions.",

        },
        {
            name: "test_instructions",
            type: "input" ,
            message: "What are the test instructions?",


        },
        {
            name: "project_license",
            type: "checkbox",
            message: "Please select one license for this project",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPL v3",
            ]
        },
       

    ]);
}
//our license function. Instructions to read the file in our Licenses folder and returns a utf encoded string to our readme.
function getLicense(license){
    // our path.resolve argument creates the filepath to the item that exists in the directory where the script is being run
    if (license[0] === "Apache"){
        return fs.readFileSync(path.resolve(__dirname, './Licenses/apache.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "MIT"){
        return fs.readFileSync(path.resolve(__dirname, './Licenses/mit.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "ISC"){
        return fs.readFileSync(path.resolve(__dirname, './Licenses/isc.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "GNU GPL v3"){
        return fs.readFileSync(path.resolve(__dirname, './Licenses/gnu.txt'), { encoding: 'utf-8'})
    }
    console.log(license)
}

//this function creates the content of our readme based off the user responses to the questions

function generateMarkdown(response){

        return`

# ${response.project_title}
![](https://img.shields.io/badge/Readme-100%25-green)

# Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Test](#test)
- [License](#license)

## Description: 

         ${response.project_description}

## Installation:

         ${response.installation_instructions}

## Usage:

         ${response.usage_instructions}

## Credits:

        ${response.project_credits}

## Test: 

        ${response.test_instructions}

## License:
    

    
    ${getLicense(response.project_license)}
      

   
`;
}
// this function generates the readme file based off the user input then writes it
  function init(){
      promptUser()
      .then(function(response) {
          let readMe = generateMarkdown(response);
          fs.writeFileSync("README.md" , readMe)
      })
      .catch(function(err){
          console.log("THERE WAS BIG ERROR" , err)

      })
  }
// this calls the function
init();









