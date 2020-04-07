export interface TelemtryPayload{
    deviceId: string;
    time: string;
}

export interface DeviceTelemetry {
    deviceId: string;
    request: string;
    data_type: string;
    pressure_chamber ?: number;
    specific_gravity ?: number;
    specific_gravity_colour ?: number;
    protocol_step_index ?: number;
    protocol_time_remaining ?: number;
    temprature_chamber_base_0 ?: number;
    temprature_chamber_base_1 ?: number;
    temprature_chamber_base_2 ?: number;
    temprature_chamber_base_3 ?: number;
    temprature_chamber_base_4 ?: number;
    temprature_chamber_base_5 ?: number;
    temprature_chamber_fluid_2 ?: number;
    temprature_chamber_fluid_3 ?: number;
    temprature_chamber_level_2 ?: number;
    temprature_chamber_level_3 ?: number;
    temprature_valve ?: number;
    temprature_waxbath_base_1 ?: number;
    temprature_waxbath_base_2 ?: number;
    temprature_waxbath_base_3 ?: number;
    temprature_waxbath_fluid_1 ?: number;
    temprature_waxbath_fluid_2 ?: number;
    temprature_waxbath_fluid_3 ?: number;
    temprature_waxbath_level_1 ?: number;
    temprature_waxbath_level_2 ?: number;
    temprature_waxbath_level_3 ?: number;
    temprature_waxpipe_1 ?: number;
    temprature_waxpipe_2 ?: number;
    temprature_waxpipe_3 ?: number;
    temprature_reagent_alcohol ?: number;
    temprature_reagent_xylene ?: number;
    chamber_fluid_level ?: number;
    chamber_level_sensor_1 ?: number;
    chamber_level_sensor_2 ?: number;
    chamber_level_sensor_3 ?: number;
    valve_position ?: number;
    power_rail_1V1 ?:number;
    power_rail_2V5 ?:number;
    power_rail_3V3 ?:number;
    power_rail_3V3_filtered ?:number;
    power_rail_5V ?:number;
    power_rail_12V ?:number;
    power_rail_12V_filtered ?:number;
    power_rail_24V ?:number;
    power_rail_48V_electronics_wax ?:number;
    battery_1_voltage ?:number;
    battery_2_voltage ?:number;
    battery_3_voltage ?:number;
    battery_4_voltage ?:number;
    battery_1_current ?:number;
    battery_2_current ?:number;
    battery_3_current ?:number;
    battery_4_current ?:number;
}
