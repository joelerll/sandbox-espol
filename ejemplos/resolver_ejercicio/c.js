// The path to your python script
var myPythonScript = "if_else.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python.exe";

// Function to convert an Uint8Array to a string
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;
const scriptExecution = spawn(pythonExecutable, [myPythonScript]);

// Handle normal output
scriptExecution.stdout.on('data', (data) => {
    console.log(uint8arrayToString(data));
});

// Handle error output
scriptExecution.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
});

scriptExecution.on('exit', (code) => {
    console.log("Process quit with code : " + code);
});
