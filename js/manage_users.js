$(function(){
    $('#dg').edatagrid({
        url: 'get_users.php',
        saveUrl: 'save_user.php',
        updateUrl: 'update_user.php',
        destroyUrl: 'destroy_user.php'
    });
});

function addRow(){
	$('#dg').edatagrid('addRow');
}

function deleteRow(){
	$('#dg').edatagrid('destroyRow');
}

function saveRow(){
	$('#dg').edatagrid('saveRow');
}

function cancelRow(){
	$('#dg').edatagrid('cancelRow')
}