export class config {
    fastLevel;
    maxHp;
    hp;

    constructor({ fastLevel, hp }: { fastLevel?: number; hp?: number }) {
        this.fastLevel = fastLevel ?? 1;
        this.maxHp = hp ?? 1000;
        this.hp = hp ?? 1000;
    }
}
