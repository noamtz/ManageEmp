 function addPanel(){
            var region = $('#region').val();
            var options = {
                region: region
            };
            if (region=='north' || region=='south'){
                options.height = 50;
            } else {
                options.width = 100;
                options.split = true;
                options.title = $('#region option:selected').text();
            }
            $('#cc').layout('add', options);
        }
		
function removePanel(){
    $('#cc').layout('remove', $('#region').val());
}