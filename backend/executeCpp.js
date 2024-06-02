const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, input) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const inputFilePath = path.join(outputPath, `${jobId}.txt`);

    return new Promise((resolve, reject) => {
        fs.writeFileSync(inputFilePath, input);

        exec(
            `g++ ${filepath} -o ${outPath} && ${outPath} < ${inputFilePath}`,
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
    executeCpp,
};
