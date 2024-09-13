module.exports = (app,child_road_model) => {
    app.get("/get_all/favorite_road",(req,res)=> {
        let decrypted_value = []
        try {
            child_road_model.find().then((a)=> {
                favorite_to_return = {
                    value_object : [],
                    setter : function(a) {
                        this.value_object.push(a)
                    },
                        tab_base : [...a],
                    tab_setter : function(a) {
                        this.tab_base = a
                    }
                }
                if(a.length !== 0) {
                    recursive()
                    console.log(favorite_to_return.tab_base.length)
                    for(let i of Array.from(favorite_to_return.value_object)) {
                            console.log(i)
                            decrypted_value.push({
                                parent_ident_equal_to_child: i.parent_ident_equal_to_child,
                                name: atob(i.name),
                                description: atob(i.description),
                                distance: atob(i.distance),
                                presentation_image: i.presentation_image,
                                sejour_delay: atob(i.sejour_delay),
                                like_by_members: i.like_by_members,
                                price: atob(i.price),
                                difficulty: atob(i.difficulty)
                            })
                    }
                    return res.json({data : decrypted_value})
                }
            else {
                return res.json({message : "vide"} )
            }
            })
        } catch (error) {   
            console.log(error)
        }
    })
}
//tsy mande le iz  ndraindray  
function recursive() {
    console.log(favorite_to_return.tab_base[0].like_by_members.length)
    favorite_to_return.setter(Array.from(favorite_to_return.tab_base).reduce((a,b)=> a.like_by_members.length > b.like_by_members.length ? a : b))
    favorite_to_return.tab_setter(Array.from(favorite_to_return.tab_base).filter(c => c !== favorite_to_return.value_object[favorite_to_return.value_object.length - 1]))
    if(Array.from(favorite_to_return.value_object).length <= 3 && Array.from(favorite_to_return.tab_base).length !== 0) recursive()     
}