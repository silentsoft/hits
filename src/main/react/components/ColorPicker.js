import React from "react";
import {SketchPicker} from "react-color";
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
                width: '36px',
                height: '100%',
                borderRadius: '2px',
                background: `${thumbColor}` ? `${thumbColor}` : `${props.color}`,
            },
            swatch: {
                padding: '5px',
                height: '100%',
                background: '#fff',
                borderRadius: '1px',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                marginInlineStart: '-173px',
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
        <div className="flex">
            <input type="text" className="w-full border border-r-0 rounded-r-none border-gray-300 dark:border-gray-700 pl-3 py-1.5 shadow-sm rounded focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder={props.color} value={color} onChange={(e) => handleChangeComplete(e.target.value)} />
            <div className="border border-gray-300 dark:border-gray-700 shadow-sm bg-transparent rounded-r">
                <div style={pickerStyles.swatch} onClick={handleClick}>
                    <div style={pickerStyles.color} />
                </div>
                { displayColorPicker ? <div style={pickerStyles.popover}>
                    <div style={pickerStyles.cover} onClick={handleClose}/>
                    <SketchPicker color={thumbColor ? thumbColor : props.color} disableAlpha={true}
                                  onChange={handleChange}
                                  onChangeComplete={(color) => handleChangeComplete(color.hex)}
                                  presetColors={['#4c1', '#97ca00', '#dfb317', '#fe7d37', '#e05d44', '#007ec6', '#555', '#9f9f9f']}/>
                </div> : null }
            </div>
        </div>
    );
}