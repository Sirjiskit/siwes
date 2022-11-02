$("#print").click(function() {
    var today = new Date();
    jQuery('#printContent').print({
        // Use Global styles
        globalStyles: true,

        // Add link with attrbute media=print
        mediaPrint: false,
        //Custom stylesheet print.css
        stylesheet: "../css/print.css",
        //Print in a hidden iframe
        iframe: false,

        // Don't print this
        noPrintSelector: ".avoid-this",

        // Add this on top
        append: '',
        // Add this at bottom
        prepend: "Supervision List",

        // Manually add form values
        manuallyCopyFormValues: true,

        // resolves after print and restructure the code for better maintainability
        deferred: $.Deferred(),

        // timeout
        timeout: 250,

        // Custom title
        title: false,
        //Custom Heading
        head: $('#title').html(),
        // Custom document type
        doctype: '<!doctype html>'
    });
})