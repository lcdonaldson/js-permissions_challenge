var source = $("#user-template").html();
var template = Handlebars.compile(source);


$(function () {

    var usersUrl = 'http://localhost:3000/users'
    var permissionsUrl = 'http://localhost:3000/permissions'
    

    function getUsers() {
       return $.get(usersUrl)      
    }

    function getPermissions() {
       return $.get(permissionsUrl)      
    }

    var Users = getUsers()
    // // console.log('hey', Users)

    var Permissions = getPermissions()
    // // console.log('hey', Permissions)

    // .done(function (Permissions) {
    //     // console.log('great')
    // })


    // button click and ajax request with loops to get users and permissions from json
    $('body').on('click', 'button', function () {
        $('.primary').empty()
        $('.secondary').hide()
        Users.done(function (users) {
            users.forEach(function (user) {
                Permissions.done(function (permissions) {
                    permissions.forEach(function (permission) {
                    // console.log(permission)
                    })
                })
                // console.log(user)
                var html = template({user})
                // console.log(html)
                $('.primary').append(html)
            }) 
        })

    })
    // second button click for get permission button
    $('.primary').on('click', '.perm_id', function () {
        $('li').remove()
        $('.secondary').show()
        // resetting the UI
        $('.secondary li').remove()
        $('.secondary h3').text("")

        // getting the data
        var id = $(this).parent('li').data('id')
        var name = $(this).parent('li').data('name')
        

        // updating the UI by joining user and permission ids
        Permissions.done(function (permissions) {
            permissions.forEach(function (permission) {
                if(id === permission.userId) {
                    $('.secondary ul').append('<li>' + permission.permissions + '</li>')
                }
            })
        })
                            
        $('.secondary h3').append(name) 
    })

})
        // $.get(Users) 
        //     .done(function (users) {
        //         $.get(Permissions)
        //             .done(function (perms) {
        //                 users.forEach(function (currentUser) {
        //                     currentUser.perms = {}
        //                     perms.forEach(function (currentPerm) {
        //                         if(currentUser.id === currentPerm.userId) {
        //                             currentUser.perms[currentPerm.permissions] = currentPerm.permissions
        //                         }
        //                     })
        //                 })
        //             })
    
        //     });
     

        // $('main').append('<li> Brad <button class="permissions">Get Permissions</button></li>')
