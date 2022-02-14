function Book(name, author) {
    this.name = name;
    this.author = author;
    return this;
}

function Foo(Cclass, name, author) {
  Cclass.call(this, name, author);
}

Foo.prototype = Object.create(Book.prototype);


var book = new Foo(Book, 'js', 'petr');

console.log(book.name);

// карирование

function car(value, val2){
    if(val2 !== undefined){
        return value + val2;
    } else {
        return function(v){
            return value + v;
        }
    }
}

console.log(car(2)(5));


//////////////////

function car2(value){
    let buf = value;

    return function(v){
        if(v === undefined){
            return buf;
        } else {
            return car2(value + v);
        }
    }
}

console.log(car2(2)(4)(6)());


///////////////////////////

function foo(value) {
	var acc = value;
	function addNext(next) {
		acc += next;
		return addNext;
	}
	addNext.toString = function() {
		return acc;
	}
	return addNext;
}

console.log(foo(2)(4)(6).toString());