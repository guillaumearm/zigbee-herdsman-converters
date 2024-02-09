import * as modernExtend from './modernExtend';
import { Tz, Fz, KeyValue } from '../lib/types';
export declare const ledvanceFz: {
    pbc_level_to_action: {
        cluster: string;
        type: string[];
        convert: (model: import("../lib/types").Definition, msg: Fz.Message, publish: import("../lib/types").Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: unknown;
        };
    };
};
export declare const ledvanceTz: {
    ledvance_commands: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
};
export declare function ledvanceOnOff(args?: modernExtend.OnOffArgs): import("../lib/types").ModernExtend;
export declare function ledvanceLight(args?: modernExtend.LightArgs): import("../lib/types").ModernExtend;
//# sourceMappingURL=ledvance.d.ts.map