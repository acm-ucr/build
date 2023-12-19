import { setFailed, info, error } from "@actions/core";
import { getExecOutput } from "@actions/exec";

const build = async () => {
  try {
    const { stdout } = await getExecOutput("npm ci");
    info(stdout);
  } catch (err) {
    error(err);
    setFailed(
      "Please ensure you have a `package-lock.json` file. You can generate one with `npm i`"
    );
    return;
  }

  try {
    const { stdout } = await getExecOutput("npm run build");
    info(stdout);
  } catch (err) {
    error(err);
    setFailed(
      "Please address your build issues. You can replicate these errors with `npm run build`"
    );
  }
};

await build();
