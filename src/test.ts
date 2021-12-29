//Декоратор класса
function Component(id: number): Function {
	return (target: Function): void => {
		target.prototype.id = id;
	};
}

//Декоратор метода
function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void {
	const oldValue = propertyDescriptor.value;
	propertyDescriptor.value = function (...args: unknown[]): number | undefined {
		if (typeof args[0] == 'number') {
			return args[0] * 10;
		}
	};
}

//Декоратор свойства
function Prop(target: Object, propertyKey: string): void {
	let value: number;
	const getter = (): number => {
		return value;
	};
	const setter = (newValue: number): void => {
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

//Декоратор параметра
function Param(target: Object, propertyKey: string, index: number): void {}

@Component(1)
class User {
	@Prop id: number;
	@Method
	updateId(@Param newId: number): void {
		this.id = newId;
	}
}

console.log(new User().id);
