-- CreateTable
CREATE TABLE `usuarios` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_nombre` VARCHAR(50) NOT NULL,
    `usuario_apellido` VARCHAR(50) NOT NULL,
    `usuario_correo` VARCHAR(100) NOT NULL,
    `usuario_contrasena` VARCHAR(255) NOT NULL,
    `usuario_rol` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `usuario_correo`(`usuario_correo`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_tareas` (
    `estado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado_nombre` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `estado_nombre`(`estado_nombre`),
    PRIMARY KEY (`estado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prioridad_tareas` (
    `prioridad_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prioridad_nombre` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `prioridad_nombre`(`prioridad_nombre`),
    PRIMARY KEY (`prioridad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_tareas` (
    `tipo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_nombre` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tipo_nombre`(`tipo_nombre`),
    PRIMARY KEY (`tipo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tareas` (
    `tarea_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tarea_titulo` VARCHAR(100) NOT NULL,
    `tarea_descripcion` TEXT NOT NULL,
    `tarea_fechaLimite` DATE NOT NULL,
    `tarea_hora` TIME(0) NOT NULL,
    `estado_id` INTEGER NOT NULL,
    `prioridad_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `tipo_id` INTEGER NOT NULL,

    INDEX `estado_id`(`estado_id`),
    INDEX `fk_tareas_tipo`(`tipo_id`),
    INDEX `prioridad_id`(`prioridad_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`tarea_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_tareas` (
    `historial_id` INTEGER NOT NULL AUTO_INCREMENT,
    `historial_fechaRegistro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tarea_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `estado_id` INTEGER NOT NULL,

    INDEX `estado_id`(`estado_id`),
    INDEX `tarea_id`(`tarea_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`historial_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificaciones` (
    `notificacion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `notificacion_mensaje` TEXT NOT NULL,
    `notificacion_fechaEnvio` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `notificacion_entregado` BOOLEAN NOT NULL DEFAULT false,
    `tarea_id` INTEGER NOT NULL,

    INDEX `tarea_id`(`tarea_id`),
    PRIMARY KEY (`notificacion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `fk_tareas_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_tareas`(`tipo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`estado_id`) REFERENCES `estado_tareas`(`estado_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_ibfk_3` FOREIGN KEY (`prioridad_id`) REFERENCES `prioridad_tareas`(`prioridad_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_ibfk_4` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_tareas` ADD CONSTRAINT `historial_tareas_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `tareas`(`tarea_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_tareas` ADD CONSTRAINT `historial_tareas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_tareas` ADD CONSTRAINT `historial_tareas_ibfk_3` FOREIGN KEY (`estado_id`) REFERENCES `estado_tareas`(`estado_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificaciones` ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `tareas`(`tarea_id`) ON DELETE CASCADE ON UPDATE CASCADE;
