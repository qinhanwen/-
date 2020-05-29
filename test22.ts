class a{
  getname(){

  }
  mounted(){
    
  }
  get name(){
    return 1
  }
}
Object.getOwnPropertyNames(a).forEach(key=>{
  const descriptor = Object.getOwnPropertyDescriptor(a.prototype, key);
  console.log(descriptor);
})
