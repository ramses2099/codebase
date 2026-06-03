import { DEBUG } from "../core/constants.js"

export class ObjectPooler {
  constructor (factoryfn, poolSize) {
    this.factoryfn = factoryfn
    this.pool = []
    this.active = []

    for (let i = 0; i < poolSize; i++) {
      this.pool.push(this.factoryfn())
    }
  }

  get () {
    let obj
    if (this.pool.length > 0) {
      obj = this.pool.pop()
    }else{
        obj = this.factoryfn();
        if(DEBUG){
            console.log('[DEV] Pool expanded, create new object');
        }
    }
    this.active.push(obj);
    return obj
  }

  updateAll (dt, ...args) {
    // Update in reverse
    for (let i = this.active.length -1; i >=0; i--) {
        const obj = this.active[i];
        obj.update(dt, ...args)
        if(!obj.active){
            this.release(obj)
        }        
    }
  }

  release (obj) {
    const index = this.active.indexOf(obj);
    if(index > -1){
        this.active.splice(index, 1);
        obj.reset()
        this.pool.push(obj)
    }
  }

  releaseAll () {
    for (let i = 0; i < this.active.length; i++) {
        this.active[i].reset()
        this.pool.push(this.active[i])        
    }
    this.active = []
  }
}
