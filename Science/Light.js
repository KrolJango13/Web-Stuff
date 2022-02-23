const LIGHT_SPEED = 3e8, PLANCK = 6.626e-34;

function getFrequency(wavelength,unit = "nm"){
    if(unit.toLowerCase() === "nm"){
        wavelength /= 1e9;
    }
    return {
        value: LIGHT_SPEED / wavelength,
        unit: "Hz"
    };
}

const getFrequencyJ = (energy) => ({
    value: energy / PLANCK,
    unit: "Hz"
});

const getWavelength = (freq) => ({
    value: LIGHT_SPEED / freq,
    unit: "m"
});

const getEnergy = (freq) => ({
    value: PLANCK * freq,
    unit: "J"
});
