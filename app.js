// CLTRL + SHIF + R => REFRESCA LA PAGINA Y BORRA LA CACHE
$(()=>{

    let edit = false;
    $('#task-result').hide();
    getTasks();
    $('#search').keyup((e)=> {
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'task-serve.php',
                type: 'POST',
                data: {search},
                success: (res)=>{
                    let tasks = JSON.parse(res);
                    let template = '';
                    tasks.forEach(element => {
                        template += `<li>${element.title}</li>`;
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                } 
            })
        }else{
            $('#task-result').hide(); 
        }
    });

    $('#task-fom').submit((e)=>{
        const postData = {
            id: $('#id').val(),
            title: $('#title').val(),
            description: $('#description').val(),
        }
        let url = edit === false ? 'task-save.php':'task-edit.php' ;

        $.post(url,postData, (res)=> {
            console.log(res);
            $('#task-fom').trigger('reset');
            getTasks();
        });

        e.preventDefault();
    });

    function getTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: (res) => {
                let tasks = JSON.parse(res);
                let template = '';
                tasks.forEach(element => {
                    template += `<tr taskId="${element.id}"> 
                        <td>${element.id}</td>
                        <td>
                            <a href="#" class="task-edit">${element.title}</a>
                        </td>
                        <td> ${element.description} </td>
                        <td>${element.created_at}</td>
                        <td class="text-center">
                            <button class="btn btn-danger btn-sm task-delete"> <i class="fas fa-trash"></i> </button>
                        </td>
                    </tr>`;
                });
                $('#tasks').html(template);
            }
        })
    }

    $(document).on('click', '.task-delete', ()=> {
        // let element = $(this)[0].parent.parent;
        // let element = $(this)[0].parent.parent;
        // let id = $(element).attr('taskId')
        if(confirm('Are you sure you want to delete it??')){
            let id = 10;
            $.post('task-delete.php', {id}, (res)=> {
                getTasks();
            })
        }

    })

    $(document).on('click', '.task-edit', (e)=>{
        let id = 13;
        $.post('task-get.php', {id}, (res)=>{
            const task = JSON.parse(res);
            $('#title').val(task.title)
            $('#description').val(task.description)
            $('#id').val(task.id)
            edit = true;
        })
    })
})