import React from "react";
import { SketchPicker } from "react-color";
import reactCSS from 'reactcss';

export default function ColorPicker(props) {
    const [color, setColor] = React.useState("");
    const [thumbColor, setThumbColor] = React.useState("");
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color) => {
        setThumbColor(color.hex);
    };

    const handleChangeComplete = (color) => {
        setThumbColor(color);
        setColor(color);
        props.onChange(color);
    };

    const pickerStyles = reactCSS({
        'default': {
            color: {
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                background: `${thumbColor}` ? `${thumbColor}` : `${props.color}`,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
            },
            swatch: {
                padding: '4px',
                width: '40px',
                height: '100%',
                background: 'rgba(30, 41, 59, 0.5)', // bg-slate-800/50
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
            },
            popover: {
                position: 'absolute',
                zIndex: '50',
                right: '0',
                bottom: '100%',
                marginBottom: '10px',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div className="flex relative h-10 w-full">
            {displayColorPicker ? <div data-testid="sketch-picker-wrapper" style={pickerStyles.popover} className="custom-sketch-picker">
                <div data-testid="cover" style={pickerStyles.cover} onClick={handleClose} />
                <SketchPicker color={thumbColor ? thumbColor : props.color} disableAlpha={true}
                    width="240px"
                    onChange={handleChange}
                    onChangeComplete={(color) => handleChangeComplete(color.hex)}
                    presetColors={['#4c1', '#97ca00', '#dfb317', '#fe7d37', '#e05d44', '#007ec6', '#555', '#9f9f9f']}
                    styles={{
                        default: {
                            picker: {
                                background: '#1e293b', // slate-800
                                borderRadius: '12px',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                padding: '10px'
                            },
                            saturation: {
                                borderRadius: '8px 8px 0 0',
                                marginBottom: '10px'
                            },
                            controls: {
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '10px',
                                alignItems: 'center'
                            },
                            sliders: {
                                padding: '0',
                                flex: '1'
                            },
                            color: {
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                                marginTop: '0',
                                marginRight: '0',
                                marginBottom: '0',
                                marginLeft: '0'
                            },
                            active: {
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                                borderRadius: '4px'
                            }
                        }
                    }}
                />
                <style>{`
                    .custom-sketch-picker .sketch-picker {
                        background: #1e293b !important;
                        box-sizing: border-box !important;
                    }
                    .custom-sketch-picker .sketch-picker input {
                        background-color: #334155 !important;
                        color: #fff !important;
                        border: 1px solid rgba(255,255,255,0.1) !important;
                        box-shadow: none !important;
                        border-radius: 4px !important;
                        text-align: center !important;
                        padding: 4px !important;
                    }
                    .custom-sketch-picker .sketch-picker label {
                        color: #94a3b8 !important;
                        font-weight: 600 !important;
                        text-transform: uppercase !important;
                        font-size: 10px !important;
                        margin-top: 4px !important;
                    }
                    /* Center presets */
                    .custom-sketch-picker .sketch-picker > div:last-child {
                        display: flex !important;
                        justify-content: space-between !important;
                        margin-top: 10px !important;
                        padding-top: 10px !important;
                        border-top: 1px solid rgba(255,255,255,0.1) !important;
                    }
                    .custom-sketch-picker .sketch-picker > div:last-child span {
                        margin: 0 !important;
                    }
                    .custom-sketch-picker .sketch-picker > div:last-child span div {
                        border-radius: 4px !important;
                        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1) !important;
                    }
                `}</style>
            </div> : null}
            <input
                type="text"
                className="flex-1 min-w-0 bg-slate-800/50 border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all font-mono"
                placeholder={props.color}
                value={color}
                onChange={(e) => handleChangeComplete(e.target.value)}
            />
            <div data-testid="swatch" style={pickerStyles.swatch} onClick={handleClick} className="hover:bg-slate-700/50 transition-colors border-y border-r border-white/10">
                <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: thumbColor || props.color, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)' }} />
            </div>
        </div>
    );
}