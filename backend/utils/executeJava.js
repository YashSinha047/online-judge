const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (code, input) => {
    const jobId = Date.now().toString();
    const codePath = path.join(outputPath, `${jobId}.java`);
    const inputPath = path.join(outputPath, `${jobId}.txt`);
    const classPath = path.join(outputPath);

    fs.writeFileSync(codePath, code);
    fs.writeFileSync(inputPath, input);

    return new Promise((resolve, reject) => {
        exec(
            `javac ${codePath} -d ${classPath} && java -cp ${classPath} ${jobId} < ${inputPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject({ error, stderr });
                }
                if (stderr) {
                    return reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeJava,
};
