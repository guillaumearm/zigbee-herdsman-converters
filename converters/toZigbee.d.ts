import { Tz, KeyValueAny, KeyValue } from '../lib/types';
import * as exposes from '../lib/exposes';
declare const converters: {
    light_onoff_restorable_brightness: {
        /**
         * Some devices reset brightness to 100% when turned on, even if previous brightness was different
         * This uses the stored state of the device to restore to the previous brightness level when turning on
         */
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<KeyValueAny | {
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    RM01_light_onoff_brightness: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<KeyValueAny | {
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    RM01_light_brightness_step: {
        options: exposes.Numeric[];
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness: number;
                state: string;
            };
        }>;
    };
    RM01_light_brightness_move: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness: any;
                state: string;
            };
        }>;
    };
    ptvo_switch_light_brightness: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<KeyValueAny | {
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    eurotronic_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    read: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: number]: void | import("zigbee-herdsman/dist/controller/tstype").KeyValue;
            };
        }>;
    };
    write: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    command: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    factory_reset: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    identify: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    arm_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    battery_percentage_remaining: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    battery_voltage: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    power_on_behavior: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                power_on_behavior: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_color_mode: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_color_options: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                color_options: {
                    [s: string]: any;
                };
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lock_auto_relock_time: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                auto_relock_time: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lock_sound_volume: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sound_volume: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    pincode_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lock_userstatus: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    cover_via_brightness: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                position: number;
            };
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    warning: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ias_max_duration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                max_duration: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    warning_simple: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    squawk: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    cover_state: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    cover_position_tilt: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    occupancy_timeout: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                occupancy_timeout: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    level_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                level_config: {};
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ballast_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_brightness_step: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness: number;
                state: string;
            };
        }>;
    };
    light_brightness_move: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness: any;
                state: string;
            };
        }>;
    };
    light_colortemp_step: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    light_colortemp_move: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    light_color_and_colortemp_via_color: {
        key: string[];
        options: (exposes.Numeric | exposes.Binary)[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_hue_saturation_step: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    light_hue_saturation_move: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    light_onoff_brightness: {
        key: string[];
        options: exposes.Numeric[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<KeyValueAny | {
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_colortemp_startup: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                color_temp_startup: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_color_colortemp: {
        /**
         * This converter is a combination of light_color and light_colortemp and
         * can be used instead of the two individual converters . When used to set,
         * it actually calls out to light_color or light_colortemp to get the
         * return value. When used to get, it gets both color and colorTemp in
         * one call.
         * The reason for the existence of this somewhat peculiar converter is
         * that some lights don't report their state when changed. To fix this,
         * we query the state after we set it. We want to query color and colorTemp
         * both when setting either, because both change when setting one. This
         * converter is used to do just that.
         */
        key: string[];
        options: (exposes.Numeric | exposes.Binary)[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    effect: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_remote_sensing: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_weekly_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                system_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_control_sequence_of_operation: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                control_sequence_of_operation: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_programming_operation_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                programming_operation_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_temperature_display_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                temperature_display_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_keypad_lockout: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                keypad_lockout: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_temperature_setpoint_hold: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_temperature_setpoint_hold_duration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    fan_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                fan_mode: string;
                fan_state: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_local_temperature: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_outdoor_temperature: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_local_temperature_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                local_temperature_calibration: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_occupancy: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_clear_weekly_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_pi_heating_demand: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_running_state: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_occupied_heating_setpoint: {
        key: string[];
        options: exposes.Enum[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                occupied_heating_setpoint: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_unoccupied_heating_setpoint: {
        key: string[];
        options: exposes.Enum[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                unoccupied_heating_setpoint: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_occupied_cooling_setpoint: {
        key: string[];
        options: exposes.Enum[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                occupied_cooling_setpoint: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_unoccupied_cooling_setpoint: {
        key: string[];
        options: exposes.Enum[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                unoccupied_cooling_setpoint: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_setpoint_raise_lower: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_relay_status_log: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_running_mode: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_min_heat_setpoint_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                min_heat_setpoint_limit: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_max_heat_setpoint_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                max_heat_setpoint_limit: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_min_cool_setpoint_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                min_cool_setpoint_limit: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_max_cool_setpoint_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                max_cool_setpoint_limit: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    thermostat_ac_louver_position: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                ac_louver_position: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    electrical_measurement_power: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    metering_power: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    currentsummdelivered: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    frequency: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    electrical_measurement_power_reactive: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    powerfactor: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    acvoltage: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    accurrent: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    temperature: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    illuminance: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_load: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                load: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_display_text: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                display_text: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_power_status: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                system_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_external_temp: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_mean_power: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                child_lock: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_frost_guard: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                frost_guard: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_night_switching: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                night_switching: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_relay_state: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_sensor_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sensor: unknown;
            };
        }>;
    };
    elko_regulator_time: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sensor: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_regulator_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                regulator_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_local_temperature_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                local_temperature_calibration: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    elko_max_floor_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                max_floor_temp: unknown[];
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    livolo_socket_switch_on_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    livolo_switch_on_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    livolo_dimmer_level: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness_percent: number;
                brightness: number;
                level: number;
            };
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    livolo_cover_state: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                moving: boolean;
            };
            readAfterWriteTime: number;
        }>;
    };
    livolo_cover_position: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                position: number;
                moving: boolean;
            };
            readAfterWriteTime: number;
        }>;
    };
    livolo_cover_options: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    lumi_motion_sensitivity: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                motion_sensitivity: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_presence: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_monitoring_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                monitoring_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_approach_distance: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                approach_distance: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_reset_nopresence_status: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ZigUP_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    LS21001_alert_behaviour: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                alert_behaviour: unknown;
            };
        }>;
    };
    lumi_switch_type: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                switch_type: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_power_outage_memory: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                power_outage_memory: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_light_power_outage_memory: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                power_outage_memory: unknown;
            };
        }>;
    };
    lumi_power: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_auto_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                auto_off: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    GZCGQ11LM_detection_period: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                detection_period: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_detection_interval: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                detection_interval: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_overload_protection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                overload_protection: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_mode_switch: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                mode_switch: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_button_switch_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                button_switch_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_socket_button_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                button_lock: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_led_disabled_night: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                led_disabled_night: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_flip_indicator_light: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                flip_indicator_light: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_dimmer_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                dimmer_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_operation_mode_basic: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                operation_mode: any;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_operation_mode_opple: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_do_not_disturb: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                do_not_disturb: unknown;
            };
        }>;
    };
    STS_PRS_251_beep: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    lumi_curtain_options: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                options: {
                    reverse_direction: boolean;
                    hand_open: boolean;
                    reset_limits: boolean;
                };
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_curtain_position_state: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_curtain_battery_voltage: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_curtain_acn002_charging_status: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_curtain_acn002_battery: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    SPZ01_power_outage_memory: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                power_outage_memory: unknown;
            };
        }>;
    };
    tuya_relay_din_led_indicator: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                indicator_mode: unknown;
            };
        }>;
    };
    kmpcil_res005_on_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    JTQJBF01LMBW_JTYJGD01LMBW_sensitivity: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sensitivity: unknown;
            };
        }>;
    };
    JTQJBF01LMBW_JTYJGD01LMBW_selfest: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    lumi_alarm: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_density: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    JTBZ01AQA_gas_sensitivity: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                gas_sensitivity: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_selftest: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    lumi_buzzer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    lumi_buzzer_manual: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    JYGZ01AQ_heartbeat_indicator: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                heartbeat_indicator: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_linkage_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                linkage_alarm: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    JTBZ01AQA_state: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_power_outage_count: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    RTCGQ14LM_trigger_indicator: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                trigger_indicator: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    LLKZMK11LM_interlock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                interlock: unknown;
            };
        }>;
    };
    DJT11LM_vibration_sensitivity: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sensitivity: unknown;
            };
        }>;
    };
    hue_wall_switch_device_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_thermostat_occupied_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_thermostat_occupied_heating_setpoint_scheduled: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_mounted_mode_active: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_mounted_mode_control: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                mounted_mode_control: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_thermostat_vertical_orientation: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                thermostat_vertical_orientation: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_external_measured_room_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                external_measured_room_sensor: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_radiator_covered: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                radiator_covered: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_viewing_direction: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                viewing_direction: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_algorithm_scale_factor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                algorithm_scale_factor: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_heat_available: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                heat_available: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_heat_required: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_day_of_week: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                day_of_week: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_trigger_time: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                trigger_time: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_window_open_feature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                window_open_feature: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_window_open_internal: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_window_open_external: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                window_open_external: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_load_balancing_enable: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                load_balancing_enable: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_load_room_mean: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                load_room_mean: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_load_estimate: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_preheat_status: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_adaptation_status: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_adaptation_settings: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                adaptation_run_settings: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_adaptation_control: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                adaptation_run_control: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_regulation_setpoint_offset: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                regulation_setpoint_offset: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_output_status: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_room_status_code: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_system_status_code: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_system_status_water: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    danfoss_multimaster_role: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ZMCSW032D_cover_position: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                position: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    namron_thermostat: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    namron_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                child_lock: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    easycode_auto_relock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                auto_relock: unknown;
            };
        }>;
    };
    tuya_led_control: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                brightness: number;
            };
            readAfterWriteTime?: undefined;
        } | {
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    tuya_led_controller: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    aqara_opple_operation_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                operation_mode: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    EMIZB_132_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                interface_mode: unknown;
            };
        }>;
    };
    eurotronic_host_flags: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    eurotronic_error_status: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    eurotronic_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    eurotronic_valve_position: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    eurotronic_trv_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    stelpro_thermostat_outdoor_temperature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    DTB190502A1_LED: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ptvo_switch_trigger: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ptvo_switch_uart: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ptvo_switch_analog_input: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tint_scene: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    bticino_4027C_cover_state: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                position: number;
            };
            readAfterWriteTime: number;
        }>;
    };
    bticino_4027C_cover_position: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                position: number;
            };
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    legrand_identify: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    legrand_device_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                device_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    legrand_pilot_wire_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                pilot_wire_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    legrand_power_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    diyruz_freepad_on_off_config: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
    };
    TYZB01_on_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
        } | {
            state?: undefined;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    diyruz_geiger_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, rawValue: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    diyruz_airsense_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, rawValue: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    diyruz_zintercom_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, rawValue: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    power_source: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ts0201_temperature_humidity_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    heiman_ir_remote: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    scene_store: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: KeyValueAny, meta: Tz.Meta) => Promise<{
            state: {};
        }>;
    };
    scene_recall: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            membersState: KeyValueAny;
            state?: undefined;
        } | {
            state: any;
            membersState?: undefined;
        }>;
    };
    scene_add: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {};
        }>;
    };
    scene_remove: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    scene_remove_all: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    scene_rename: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    TS0003_curtain_switch: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ts0216_duration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ts0216_volume: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ts0216_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_cover_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                calibration: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    tuya_cover_reversal: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                motor_reversal: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    moes_cover_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                calibration_time: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ZM35HQ_attr: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    TS0210_sensitivity: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                sensitivity: unknown;
            };
        }>;
    };
    viessmann_window_open: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    viessmann_window_open_force: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            readAfterWriteTime: number;
            state: {
                window_open_force: boolean;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    viessmann_assembly_mode: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    dawondns_only_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    idlock_master_pin_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                master_pin_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    idlock_rfid_enable: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                rfid_enable: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    idlock_service_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                service_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    idlock_lock_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                lock_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    idlock_relock_enabled: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                relock_enabled: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    schneider_pilot_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                schneider_pilot_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    schneider_dimmer_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                dimmer_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    wiser_dimmer_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                dimmer_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    schneider_temperature_measured_value: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    schneider_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                system_mode: unknown;
            };
        }>;
    };
    schneider_thermostat_occupied_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                occupied_heating_setpoint: number;
            };
        }>;
    };
    schneider_thermostat_control_sequence_of_operation: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                control_sequence_of_operation: unknown;
            };
        }>;
    };
    schneider_thermostat_pi_heating_demand: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                pi_heating_demand: unknown;
            };
        }>;
    };
    schneider_thermostat_keypad_lockout: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                keypad_lockout: unknown;
            };
        }>;
    };
    ZNCJMB14LM: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValue;
        }>;
    };
    ZNCLBL01LM_hooks_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
    };
    ZNCLBL01LM_hooks_state: {
        key: string[];
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ZNCLBL01LM_hand_open: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ZNCLBL01LM_limits_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    wiser_fip_setting: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                fip_setting: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    wiser_hact_config: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                hact_config: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    wiser_zone_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                zone_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    wiser_vact_calibrate_valve: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                calibrate_valve: unknown;
            };
        }>;
    };
    wiser_sed_zone_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                zone_mode: unknown;
            };
        }>;
    };
    wiser_sed_occupied_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                occupied_heating_setpoint: number;
            };
        }>;
    };
    wiser_sed_thermostat_local_temperature_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                local_temperature_calibration: number;
            };
        }>;
    };
    wiser_sed_thermostat_keypad_lockout: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                keypad_lockout: unknown;
            };
        }>;
    };
    sihas_set_people: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    tuya_operation_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                operation_mode: string;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_lock_relay_opple: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                lock_relay: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    lumi_switch_click_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                click_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    led_on_motion: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                led_on_motion: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    nodon_pilot_wire_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                pilot_wire_mode: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    ignore_transition: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    ignore_rate: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    __clearStore__: () => void;
    on_off: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                state: string;
            };
        } | {
            state?: undefined;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_color: {
        key: string[];
        options: (exposes.Numeric | exposes.Binary)[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
    light_colortemp: {
        key: string[];
        options: (exposes.Numeric | exposes.Binary)[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValueAny;
            readAfterWriteTime: number;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, meta: Tz.Meta) => Promise<void>;
    };
};
export default converters;
//# sourceMappingURL=toZigbee.d.ts.map