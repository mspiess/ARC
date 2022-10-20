import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Riddle } from "./riddle";
import { Brain } from "./brain";

describe('training', function () {
    const directoryName = 'data/training/';
    const filenames = readdirSync(directoryName);

    filenames.map(filename => {
        const content = readFileSync(join(directoryName, filename), { encoding: 'utf-8' });
        const riddle = JSON.parse(content) as Riddle;
        it(filename, function () {
            const brain = new Brain(riddle.train);
            expect(riddle.test).toHaveLength(1);
            const testPair = riddle.test[0];
            const { input, output } = testPair;
            const solution = brain.solve(input);
            expect(solution).toEqual(output);
        });
    });
});