import React from 'react';

import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';
import { cpus } from 'os';

class Calculator extends React.Component {
    state = {
        equation: '',
        result: 0   
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;
    
        if (pressedButton === 'C') return this.clear();
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') equation += pressedButton;
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1)
            { 
                if (equation === '') equation += '0 ' + pressedButton + ' ';
                else equation += ' ' + pressedButton + ' ';
            }
        else if (['(', ')', '√', '²'].indexOf(pressedButton) !== -1)
            {
                equation += ' ' + pressedButton + ' ';
            }
        else if (pressedButton === '=') {
            let equation2 = equation.replace(/\s+/g,'');
          try {
              if (equation.indexOf('√' !== -1 && equation.indexOf('²') !== -1)) {
                if (equation.indexOf('²') !== -1)
                {   for (let x=equation2.length-1;x>=0;x--)
                    {
                        //console.log("x => " + x);
                        if (equation2.charAt(x) === '²')
                        {
                        //    console.log("found");
                            let p = x;
                            let i = 1;
                            while (equation2.charAt(p-i) !== '+'  && equation2.charAt(p-i) !== '-' && equation2.charAt(p-i) !== '*' && equation2.charAt(p-i) !== '/' && equation2.charAt(p-i) !== '%' && p-i < 0) {i++;}
                        //    console.log(equation2.slice(p-i,p))
                        //    console.log(Math.pow(equation2.slice(p-i,p),2))
                        //    console.log(equation2.replace(equation2.slice(p-i,p+1),Math.pow(equation2.slice(p-i,p),2)));
                            equation2 = equation2.replace(equation2.slice(p-i,p+1),Math.pow(equation2.slice(p-i,p),2));
                            x=equation2.length;
                        } 
                    }
                }
                if (equation.indexOf('√') !== -1)
            {
                
                for (let x=0;x<equation2.length;x++)
                {
                //  console.log("x => " + x);
                    if (equation2.charAt(x) === '√')
                    {
                //      console.log("found");
                        let p = x;
                        let i = 1;
                        while (equation2.charAt(p+i) !== '+'  && equation2.charAt(p+i) !== '-' && equation2.charAt(p+i) !== '*' && equation2.charAt(p+i) !== '/' && equation2.charAt(p+i) !== '%' && p+i <= equation2.length) {i++;}
                //      console.log(equation2.replace(equation2.slice(p,p+i),Math.sqrt(equation2.slice(p+1,p+i))));
                        equation2 = equation2.replace(equation2.slice(p,p+i),Math.sqrt(equation2.slice(p+1,p+i)));
                        x-=i;

                    }
                } 
            }
            const evalResult = eval(equation2);
            const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
            this.setState({equation: result,result: result});  
            }
            else
            {
                const evalResult = eval(equation);
                const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
                this.setState({equation: result,result: result}); 
            }
          } catch (error) {
            alert('Invalid Mathematical Equation');
          }  
        }
        else {
            try {
                equation = equation.trim();
                equation = equation.substr(0, equation.length - 1);
                } catch(error) {
                    alert('Action not possible');
                }        
            }   
        if (pressedButton !== '=') {           
        this.setState({equation: equation});
        }
       // else this.setState({equation: Number.isInteger(eval(equation))? eval(equation): eval(equation).toFixed(2)});
      }
   
    clear() {
        this.setState({equation: '', result: 0});
    }

    render() {
        return ( 
            <main className="calculator">
                <Screen equation={this.state.equation} result={this.state.result} />
                <Keypad onButtonPress = {this.onButtonPress} />
            </main>
        );
    }
}

export default Calculator;