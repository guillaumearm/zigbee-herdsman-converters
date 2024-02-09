import { Definition, Range } from '../lib/types';
import { LightArgs } from '../lib/modernExtend';
export declare function tradfriLight(args?: Omit<LightArgs, 'colorTemp'> & {
    colorTemp?: true | {
        range: Range;
        viaColor: true;
    };
}): import("../lib/types").ModernExtend;
declare const definitions: Definition[];
export default definitions;
//# sourceMappingURL=ikea.d.ts.map