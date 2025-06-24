class ${1:MyClass} {
    constructor(${2:prop}) {
      this.${2:prop} = ${2:prop};
    }
  
    ${3:myMethod}() {
      console.log('Method ${3:myMethod} called with', this.${2:prop});
    }
  }
  
  // Uso de ejemplo
  const instance = new ${1:MyClass}('${4:example}');
  instance.${3:myMethod}();
  